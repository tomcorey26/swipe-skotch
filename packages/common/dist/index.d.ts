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
    ALL_USERS: string;
    SEND_SIGNAL: string;
    RETURN_SIGNAL: string;
    USER_JOINED: string;
    RECIEVE_RETURN_SIGNAL: string;
    DISCONNECT: string;
    USER_DISCONNECT: string;
    START_GAME: string;
    BEGIN_CHESS: string;
};
export declare enum GameType {
    CHESS = 0,
    CHAT = 1
}
export interface ChessPlayer {
    id: string;
    color: 'b' | 'w';
}
export { userMessage };
