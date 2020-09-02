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
import { useLocalStorage } from './useLocalStorage';
import { useSocketIoContext } from '../context/socketIO';

const socket = socketIOClient(process.env.REACT_APP_SERVER_URL as string);

export interface SocketProps {
  socket: SocketIOClient.Socket;
  yourID: MutableRefObject<string>;
  users: any;
  name: string;
  setName: any;
  nameRef: MutableRefObject<string | undefined>;
}
export const useSocketIO = (): SocketProps => {
  let { roomId } = useParams();
  const yourID = useRef<string>('');
  const [users, setUsers] = useState({});
  const [name, setName, nameRef] = useLocalStorage(roomId, '');

  useEffect(() => {
    socket.on('allUsers', (data: any) => {
      setUsers(data);
    });

    socket.on('yourId', (data: any) => {
      yourID.current = data;
    });
  }, []);

  return { socket, yourID, users, name, setName, nameRef };
};

export const useSocketTextChat = () => {
  let { roomId } = useParams();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<userMessage[]>([]);
  const { socket, nameRef } = useSocketIoContext();

  const emitMessage = (e: SyntheticEvent) => {
    e.preventDefault();
    socket.emit('message', { input, roomId, name: nameRef.current });
    setInput('');
  };

  useEffect(() => {
    socket.on('message', (data: userMessage) => {
      setMessages((m) => [...m, data]);
    });
  }, [socket]);

  return { input, setInput, emitMessage, messages, setMessages };
};
