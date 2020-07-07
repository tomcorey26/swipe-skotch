"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startChatConnection = void 0;
const common_1 = require("@skotch/common");
const users = {};
const botName = 'TomCord Bot';
const initTextChat = (socket, io) => {
    socket.emit('message', common_1.formatMessage(botName, 'Welcome to Tom Cord!'));
    socket.broadcast.emit('message', common_1.formatMessage(botName, 'a user has joined the chat'));
    socket.on('message', (data) => {
        console.log(data);
        io.emit('message', common_1.formatMessage('tom', data));
    });
};
const initVideoChat = (socket, io) => {
    socket.on('callUser', (data) => {
        io.to(data.userToCall).emit('hey', {
            signal: data.signalData,
            from: data.from,
        });
    });
    socket.on('acceptCall', (data) => {
        console.log('call accepted server');
        io.to(data.to).emit('callAccepted', data.signal);
    });
};
exports.startChatConnection = (io) => {
    io.on('connection', (socket) => {
        if (!users[socket.id]) {
            users[socket.id] = socket.id;
        }
        socket.emit('yourId', socket.id);
        io.emit('allUsers', users);
        initTextChat(socket, io);
        initVideoChat(socket, io);
        socket.on('disconnect', () => {
            delete users[socket.id];
            io.emit('message', common_1.formatMessage(botName, 'A user disconnected'));
        });
    });
};
//# sourceMappingURL=startChatConnection.js.map