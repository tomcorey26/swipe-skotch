import React, { useState, useEffect } from 'react';
import { ChatMessages } from '../ChatMessages/ChatMessages';
import './Chat.scss';
import { VideoChat } from '../VideoChat/VideoChat';

interface ChatProps {}
export const Chat: React.FC<ChatProps> = ({}) => {
  // can use username instead of this

  return (
    <>
      {/* <h1>Your socket Id: {yourID}</h1> */}
      <div className="chat-interface">
        {/* <VideoChat socket={socket} users={users} yourID={yourID} />
        <ChatMessages socket={socket} yourID={yourID} /> */}
      </div>
    </>
  );
};
