import React, { useState, useRef, useEffect } from 'react';
import Peer from 'simple-peer';
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
  const [callerSignal, setCallerSignal] = useState();
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
    // socket.current.on('hey', (data: any) => {});
  }, []);

  function callPeer(id: string) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
  }

  function acceptCall() {}

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
    return (
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
            <button
              key={i}
              style={{ backgroundColor: 'blue' }}
              onClick={() => callPeer(id)}
            >
              Call {id}
            </button>
          );
        })}
      </div>
    </>
  );
};
