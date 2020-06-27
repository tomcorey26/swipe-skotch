"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMessage = void 0;
const moment_1 = __importDefault(require("moment"));
exports.formatMessage = (username, message) => {
    return {
        username,
        text: message,
        dateCreated: moment_1.default().format('h:mm a'),
    };
};
//# sourceMappingURL=index.js.map