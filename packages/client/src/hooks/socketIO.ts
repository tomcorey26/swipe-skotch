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

export enum GlobalTypes {
  error = 'Error',
  bot = 'Bot',
}
export interface GlobalMessage {
  type: GlobalTypes;
  msg: string;
}
export interface SocketProps {
  socket: SocketIOClient.Socket;
  yourID: MutableRefObject<string>;
  users: any;
  name: string;
  setName: any;
  nameRef: MutableRefObject<string | undefined>;
  setGlobalMessage: React.Dispatch<React.SetStateAction<GlobalMessage | null>>;
  globalMessage: GlobalMessage | null;
}

function getRoomId() {
  let path = window.location.pathname;
  return path.split('/')[2];
}
export const useSocketIO = (): SocketProps => {
  const yourID = useRef<string>('');
  const [users, setUsers] = useState({});
  const [name, setName, nameRef] = useLocalStorage(getRoomId(), '');
  const [globalMessage, setGlobalMessage] = useState<GlobalMessage | null>(
    null
  );

  useEffect(() => {
    socket.on('allUsers', (data: any) => {
      setUsers(data);
    });

    socket.on('yourId', (data: any) => {
      yourID.current = data;
    });
  }, []);

  return {
    socket,
    yourID,
    users,
    name,
    setName,
    nameRef,
    setGlobalMessage,
    globalMessage,
  };
};

export const useSocketTextChat = () => {
  let { roomId } = useParams<{ roomId: string }>();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<userMessage[]>([]);
  const { socket, nameRef, globalMessage } = useSocketIoContext();

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

  useEffect(() => {
    if (globalMessage) {
      setMessages((m) => [
        ...m,
        {
          dateCreated: 'now',
          text: globalMessage.msg,
          username: globalMessage.type,
        },
      ]);
    }
  }, [globalMessage]);

  return { input, setInput, emitMessage, messages, setMessages };
};
