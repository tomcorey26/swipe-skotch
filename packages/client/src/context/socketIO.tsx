import React, { createContext } from 'react';
import { useSocketIO, SocketProps } from '../hooks';

const SocketIoContext = createContext<SocketProps | undefined>(undefined);

export const SocketIoProvider: React.FC = ({ children }) => {
  const value = useSocketIO();
  return (
    <SocketIoContext.Provider value={value}>
      {children}
    </SocketIoContext.Provider>
  );
};

export const useSocketIoContext = () => {
  const context = React.useContext(SocketIoContext);
  if (context === undefined) {
    throw new Error('useSocketIo must be used within a Socketio provider');
  }
  return context;
};
