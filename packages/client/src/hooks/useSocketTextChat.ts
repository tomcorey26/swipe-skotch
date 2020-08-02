import { SyntheticEvent, useState, useEffect } from 'react';
import { userMessage } from '@skotch/common';

export const useSocketTextChat = (socket: SocketIOClient.Socket) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<userMessage[]>([]);

  const emitMessage = (e: SyntheticEvent) => {
    e.preventDefault();
    socket.emit('message', input);
    setInput('');
  };

  useEffect(() => {
    socket.on('message', (data: userMessage) => {
      setMessages((m) => [...m, data]);
    });
  }, [socket]);

  return { input, setInput, emitMessage, messages };
};
