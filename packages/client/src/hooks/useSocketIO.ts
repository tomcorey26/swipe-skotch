import socketIOClient from 'socket.io-client';
import { useState, useEffect } from 'react';

const socket = socketIOClient(process.env.REACT_APP_SERVER_URL as string);

interface SocketProps {
  socket: SocketIOClient.Socket;
  yourID: string;
  users: any;
}
export const useSocketIO = (): SocketProps => {
  const [yourID, setYourID] = useState('');
  const [users, setUsers] = useState({});

  useEffect(() => {
    socket.on('allUsers', (data: any) => {
      setUsers(data);
    });

    socket.on('yourId', (data: any) => {
      setYourID(data);
    });
  }, []);

  return { socket, yourID, users };
};
