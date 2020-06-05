import React from 'react';

interface ChatMessagesProps {}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ children }) => {
  return (
    <div>
      <ul>{children}</ul>
    </div>
  );
};
