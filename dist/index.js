"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// import app from ''
// import databaseConfig from './config/databaseConfig'
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./core/db"));
if (!process.env) {
    throw new Error(`.env file required pleas create`);
}
const PORT = process.env.PORT || 3000;
let existingDB = null;
;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = new db_1.default();
            db.connect();
            app_1.default.listen(PORT, () => {
                console.log(`App is running on port ${PORT}.`);
            });
            // initSocket(server)
            console.log('Database connection initialized.');
        }
        catch (e) {
            throw new Error(`DB connection error: ${e}`);
        }
    });
})();
