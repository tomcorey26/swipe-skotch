import { userMessage } from './Types';
export declare const formatMessage: (username: string, message: string) => userMessage;
export declare const socketEvents: {
    ENEMY_MOVE: string;
    MY_MOVE: string;
};
export { userMessage };
