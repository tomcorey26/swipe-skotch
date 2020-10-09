import React, { useRef, useEffect } from 'react';
import './Video.scss';

interface VideoProps {
  peer: any;
}

export const Video: React.FC<VideoProps> = ({ peer }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    peer.on('stream', (stream: MediaStream) => {
      if (ref && ref.current) {
        ref.current.srcObject = stream;
      }
    });
  }, [peer]);

  return <video className="spectator" playsInline autoPlay ref={ref} />;
};
