import { userMessage } from './Types';
export declare const formatMessage: (username: string, message: string) => userMessage;
export declare const socketEvents: {
    ENEMY_MOVE: string;
    MY_MOVE: string;
    JOIN_ROOM: string;
    USER_CONNECTED: string;
    CONNECT_PEER: string;
    CONNECT_REQUEST: string;
    LOBBY_FULL: string;
};
export { userMessage };
