"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.get('/', (_, res) => {
    res.send('The sedulous hyena ate the antelope!');
});
app.get('/hurr', (_, res) => {
    res.send('durr');
});
const port = 4000;
app.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map