import React, { useEffect, useRef, useState } from 'react';
import './Game.scss';
import {
  useRouteMatch,
  Switch,
  Route,
  useParams,
  useHistory,
} from 'react-router-dom';
import { Chess } from '../Chess/Chess';
import { ChessProvider } from '../../context/chess';
import { useSocketIoContext } from '../../context/socketIO';
import { socketEvents } from '@skotch/common';
import { SideCard } from '../Chess/SideCard/SideCard';
import Peer from 'simple-peer';
import { Video } from '../../components/Video/Video';
import { NameModal } from '../../components/NameModal/NameModal';
import { useLocalStorage } from '../../hooks';

interface GameProps {}
interface Peer {
  peerID: string;
  peer: any;
  name: string;
}

export const Game: React.FC<GameProps> = ({}) => {
  let { path } = useRouteMatch();
  const { socket, yourID } = useSocketIoContext();
  let { roomId } = useParams();
  const history = useHistory();
  const userVideo = useRef<any>();
  const peersRef = useRef<Peer[]>([]);
  const streamRef = useRef<MediaStream>();
  const [name, setName] = useLocalStorage(roomId, '');
  const [peers, setPeers] = useState<Peer[]>([]);
  const [gameActive, setGameActive] = useState<boolean>(false);

  useEffect(() => {
    socket.emit(socketEvents.NAME_CHANGE, roomId, name, yourID.current);
  }, [name, socket, roomId, yourID]);

  useEffect(() => {
    socket.on(socketEvents.LOBBY_FULL, () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      history.push('/');
    });

    socket.on(socketEvents.NAME_CHANGE, (name: string, userId: string) => {
      console.log('change', name, userId);
      setPeers((users) =>
        users.map((u) => {
          if (u.peerID === userId) {
            return { ...u, name };
          }

          return u;
        })
      );
    });
  }, [socket, history]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }

        // join room
        socket.emit(socketEvents.JOIN_ROOM, roomId);

        //after user has joined room send out peer connect requests
        socket.on(socketEvents.ALL_USERS, (users: string[]) => {
          const peers: Peer[] = [];

          // User first joining lobby logic
          users.forEach((userID: string) => {
            const peer = createPeer(userID, socket.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
              name: '',
            });
            peers.push({ peer, peerID: userID, name: '' });
          });
          setPeers(peers);
        });

        //new user joined logic
        socket.on(socketEvents.USER_JOINED, (payload: any) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
            name: payload.name,
          });
          setPeers((users) => [
            ...users,
            { peer, peerID: payload.callerID, name: payload.name },
          ]);
        });

        // Recieving finished handshake
        socket.on(socketEvents.RECIEVE_RETURN_SIGNAL, (payload: any) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          if (item) {
            item.peer.signal(payload.signal);
          }

          setPeers((users) =>
            users.map((u) => {
              if (u.peerID === payload.id) {
                return { ...u, name: payload.name };
              }

              return u;
            })
          );
        });

        socket.on(socketEvents.USER_DISCONNECT, (userID: string) => {
          removePeer(userID);
        });
      });

    return () => {};
  }, []);

  function createPeer(
    userToSignal: string,
    callerID: string,
    stream: MediaStream
  ) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    //after peer is constructed it emits this signal event
    // after handshake is accepted it emits this event again
    // make sure it only fires once to prevent infinite loop
    let signalCount = 0;
    peer.on('signal', (signal) => {
      if (!signalCount) {
        socket.emit(socketEvents.SEND_SIGNAL, {
          userToSignal,
          callerID,
          signal,
          name,
        });
        signalCount++;
      }
    });

    return peer;
  }

  function addPeer(incomingSignal: any, callerID: string, stream: MediaStream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    //since inititator is sent to false
    // this event is only called when the peer gets a offer
    peer.on('signal', (signal) => {
      socket.emit(socketEvents.RETURN_SIGNAL, { signal, callerID, name });
    });

    //accepting signal
    //triggering signal handler above
    peer.signal(incomingSignal);
    return peer;
  }

  function removePeer(userID: string) {
    const found = peersRef.current.find(({ peerID }) => peerID === userID);
    if (found) {
      found.peer.destroy();
    }
    peersRef.current = peersRef.current.filter(
      ({ peerID }) => peerID !== userID
    );
    setPeers([...peersRef.current]);
  }

  return (
    <div className="container">
      {!name && <NameModal setName={setName} />}
      <div className="game">
        <div className="spectators">
          <div className="spectator">
            <h1>{name}</h1>
            <video
              muted
              playsInline
              autoPlay
              ref={userVideo}
              className="spectator-video"
            />
          </div>
          {peers.map((item, i) => {
            return (
              <div key={i} className="spectator">
                <h1>{item.name}</h1>
                <Video peer={item.peer} />
              </div>
            );
          })}
        </div>
        <Switch>
          <Route exact path={path}>
            <h3>choose a game</h3>
          </Route>

          <Route path={`${path}/chess`}>
            <ChessProvider>
              <Chess setGameActive={setGameActive} />
            </ChessProvider>
          </Route>
        </Switch>
        <SideCard
          connectedCount={peers.length}
          roomId={roomId}
          gameActive={gameActive}
          setGameActive={setGameActive}
        />
      </div>
    </div>
  );
};
