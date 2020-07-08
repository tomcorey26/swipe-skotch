import React, { useState, useEffect } from 'react';
import { ChatMessages } from '../ChatMessages/ChatMessages';
import './Chat.scss';
import socketIOClient from 'socket.io-client';
import { VideoChat } from '../VideoChat/VideoChat';

const socket = socketIOClient(process.env.REACT_APP_SERVER_URL as string);
interface ChatProps {}
export const Chat: React.FC<ChatProps> = ({}) => {
  // can use username instead of this
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

  return (
    <>
      <h1>Your socket Id: {yourID}</h1>
      <div className="chat-interface">
        <VideoChat socket={socket} users={users} yourID={yourID} />
        <ChatMessages socket={socket} yourID={yourID} />
      </div>
    </>
  );
};
