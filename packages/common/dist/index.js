"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesArray = exports.GameType = exports.socketEvents = exports.formatMessage = void 0;
const moment_1 = __importDefault(require("moment"));
exports.formatMessage = (username, message) => {
    return {
        username,
        text: message,
        dateCreated: moment_1.default().format('h:mm a'),
    };
};
exports.socketEvents = {
    ENEMY_MOVE: 'enemyMove',
    MY_MOVE: 'chessMove',
    JOIN_ROOM: 'join-room',
    USER_CONNECTED: 'user-connected',
    CONNECT_PEER: 'connect_peer',
    CONNECT_REQUEST: 'connect_request',
    LOBBY_FULL: 'lobby-full',
    ALL_USERS: 'all-users',
    SEND_SIGNAL: 'send-signal',
    RETURN_SIGNAL: 'return-signal',
    USER_JOINED: 'user-joined',
    RECIEVE_RETURN_SIGNAL: 'recieve-return-signal',
    DISCONNECT: 'disconnect',
    USER_DISCONNECT: 'user-disconnect',
    START_GAME: 'start-game',
    BEGIN_CHESS: 'begin-chess',
    NAME_CHANGE: 'name-change',
};
var GameType;
(function (GameType) {
    GameType[GameType["CHESS"] = 0] = "CHESS";
})(GameType = exports.GameType || (exports.GameType = {}));
exports.GamesArray = [
    { enum: GameType.CHESS, name: 'chess' },
];
//# sourceMappingURL=index.js.map