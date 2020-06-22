import React, { useState, useEffect } from 'react';
import { ChatMessages } from '../ChatMessages/ChatMessages';
import './Chat.scss';
import socketIOClient from 'socket.io-client';
import { VideoChat } from '../VideoChat/VideoChat';
const ENDPOINT = 'http://localhost:4000';

const socket = socketIOClient(ENDPOINT);
interface ChatProps {}
export const Chat: React.FC<ChatProps> = ({}) => {
  // can use username instead of this
  const [yourID, setYourID] = useState('');
  const [users, setUsers] = useState({});

  useEffect(() => {
    socket.on('allUsers', (data: any) => {
      console.log(data);
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
        <ChatMessages socket={socket} />
      </div>
    </>
  );
};
