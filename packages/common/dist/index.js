"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMessage = exports.foo = void 0;
exports.foo = (poo) => {
    console.log(poo);
    console.log('hello from comomne');
};
exports.formatMessage = (username, message) => {
    return {
        username,
        text: message,
    };
};
//# sourceMappingURL=index.js.map