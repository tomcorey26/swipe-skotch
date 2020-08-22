import {
  SyntheticEvent,
  useState,
  useEffect,
  useRef,
  MutableRefObject,
} from 'react';
import socketIOClient from 'socket.io-client';
import { userMessage } from '@skotch/common';
import { useParams } from 'react-router-dom';

const socket = socketIOClient(process.env.REACT_APP_SERVER_URL as string);

export interface SocketProps {
  socket: SocketIOClient.Socket;
  yourID: MutableRefObject<string>;
  users: any;
}
export const useSocketIO = (): SocketProps => {
  const yourID = useRef<string>('');
  const [users, setUsers] = useState({});

  useEffect(() => {
    socket.on('allUsers', (data: any) => {
      setUsers(data);
    });

    socket.on('yourId', (data: any) => {
      yourID.current = data;
    });
  }, []);

  return { socket, yourID, users };
};

export const useSocketTextChat = (socket: SocketIOClient.Socket) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<userMessage[]>([]);
  let { roomId } = useParams();

  const emitMessage = (e: SyntheticEvent) => {
    e.preventDefault();
    socket.emit('message', { input, roomId });
    setInput('');
  };

  useEffect(() => {
    socket.on('message', (data: userMessage) => {
      setMessages((m) => [...m, data]);
    });
  }, [socket]);

  return { input, setInput, emitMessage, messages };
};
