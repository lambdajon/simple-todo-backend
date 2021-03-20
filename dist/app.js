"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const index_1 = __importDefault(require("./swagger/index"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
require('dotenv').config();
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = express_1.default();
app.use(cors_1.default());
// if (process.env.NODE_ENV == 'prod') {
// }
app.use(morgan_1.default('tiny'));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use('/', index_1.default);
app.use(routes_1.default);
app.get('/status', (req, res) => {
    res.json({
        stauts: 'OK',
    });
});
// app.use(rootRoute)
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   res.status(500).send({ error: 'Internal server error', ...err })
// })
exports.default = app;
