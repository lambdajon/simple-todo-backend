"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const db = mongoose_1.default.connection;
db.on('error', () => {
    console.error('mongo db error in connection');
});
db.once('open', () => {
    console.error('mongo db connection established');
});
class Database {
    // url: string = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_SERVER}`
    constructor() {
        // eslint-disable-next-line max-len
        this.url = process.env.MONGO_URL || `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_SERVER}`;
        if (process.env.MONGO_AUTH_DISABLE) {
            this.url = `mongodb://localhost:27017/${process.env.MONGODB_SERVER}`;
        }
        console.log('DATABASE URL:', this.url);
    }
    connect() {
        return mongoose_1.default.connect(this.url, {
            autoIndex: false,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        }, (error) => {
            if (error) {
                console.log('MongoDB Connection error:', error);
                process.exit(1);
            }
        });
    }
}
exports.default = Database;
