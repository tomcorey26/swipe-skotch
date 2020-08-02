import React, { SyntheticEvent, useState, useEffect } from 'react';
import { userMessage } from '@skotch/common';
import './ChatMessage.scss';
import { useSocketTextChat } from '../../hooks';

interface ChatMessagesProps {
  socket: SocketIOClient.Socket;
  yourID: string;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  socket,
  yourID,
}) => {
  const { input, setInput, emitMessage, messages } = useSocketTextChat(socket);
  return <div className="message-interface"></div>;
};
