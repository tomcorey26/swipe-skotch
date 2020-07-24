import React, { useState, useRef, useEffect } from 'react';
import Peer, { SignalData } from 'simple-peer';
import './VideoChat.scss';

interface VideoChatProps {
  socket: SocketIOClient.Socket;
  users: any;
  yourID: string;
}

export const VideoChat: React.FC<VideoChatProps> = ({
  socket,
  users,
  yourID,
}) => {
  const [stream, setStream] = useState<MediaStream>();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState<string | SignalData>();
  const [callAccepted, setCallAccepted] = useState(false);

  const userVideo = useRef<any>();
  const partnerVideo = useRef<any>();

  useEffect(() => {
    // accesses browser api to ask for audio and video which returns a promise
    async function requestCameraAccess() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    }

    requestCameraAccess();

    socket.on('hey', (data: any) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
      console.log('data form hey', data);
    });
  }, []);

  function callPeer(id: string) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    // one peer sends out signal to other
    // other accepts
    // it will signal its own data back to caller
    // its like a handshake
    peer.on('signal', (data) => {
      //emits signal to other user
      // who can then accept the data and create a handshake
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: yourID,
      });
    });

    //the stream we get back from the user who accepted our handshake
    peer.on('stream', (stream) => {
      //checking to see if video element is rendered
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.on('callAccepted', (signal: any) => {
      console.log('callaccepted');
      setCallAccepted(true);
      peer.signal(signal);
    });
  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    //every time you create a peer object it "signals"
    // this is a listener for that event
    peer.on('signal', (signal) => {
      socket.emit('acceptCall', { signal, to: caller });
    });

    //this listens for the peer.signal() event below
    peer.on('stream', (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    //this passes the signal of the caller to your peer
    // this is the way that a successful handshake is done
    // the end goal of all of this was to make sure each peer has each other signals
    // socket io is not even required, but it makes it easier to do the handshake process
    if (callerSignal) {
      peer.signal(callerSignal);
    }
  }

  let UserVideo;
  if (stream) {
    UserVideo = <video playsInline muted ref={userVideo} autoPlay />;
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = <video playsInline ref={partnerVideo} autoPlay />;
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    );
  }

  return (
    <>
      <div className="videos">
        <div className="video-frame">{UserVideo}</div>
        <div className="video-frame">{PartnerVideo}</div>
      </div>
      <div className="disconnect">
        {Object.keys(users).map((id, i) => {
          if (id === yourID) {
            return null;
          }

          return (
            <button key={i} onClick={() => callPeer(id)}>
              Call {id}
            </button>
          );
        })}
        {incomingCall}
      </div>
    </>
  );
};
