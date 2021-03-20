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
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const Token_1 = __importDefault(require("../models/Token"));
class default_1 {
    constructor() {
        this.decodeToken = (token) => __awaiter(this, void 0, void 0, function* () { return jsonwebtoken_1.decode(token); });
        this.createToken = (payload, expiresIn) => __awaiter(this, void 0, void 0, function* () {
            const secret = process.env.JWT_SECRET || "";
            const token = jsonwebtoken_1.sign(payload, secret, {
                expiresIn,
                algorithm: "HS512",
            });
            return token;
        });
        this.checkUserPassword = (passwod = "", hashedPassword = "") => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bcryptjs_1.compare(passwod, hashedPassword);
            }
            catch (e) {
                throw new Error(`checkPassword error: ${e}`);
            }
        });
        this.verifyToken = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const secret = process.env.JWT_SECRET || "";
                const isVerify = jsonwebtoken_1.verify(token, secret);
                return isVerify;
            }
            catch (e) {
                throw new Error(`verifyToken error: ${e}`);
            }
        });
        this.checkToken = (token) => __awaiter(this, void 0, void 0, function* () {
            const resultData = {
                success: false,
                msg: "INVALID_TOKEN",
                data: {},
            };
            try {
                const existingToken = yield Token_1.default.findOne({
                    accessToken: token,
                });
                if (!existingToken) {
                    return resultData;
                }
                try {
                    const isVerify = yield this.verifyToken(token);
                    resultData.msg = "SUCCESS";
                    resultData.success = true;
                    resultData.data = isVerify;
                    return resultData;
                }
                catch (err) {
                    resultData.msg = "TOKEN_EXPIRED";
                    return resultData;
                }
            }
            catch (err) {
                throw new Error(`jwtSign error: ${err}`);
            }
        });
        this.jwtSign = (user) => __awaiter(this, void 0, void 0, function* () {
            const expiresInAccessToken = process.env.JWT_ACCESS_TOKEN_T || "3600";
            const expiresInRefreshToken = process.env.JWT_REFRESH_TOKEN_T || "86400";
            try {
                const accessToken = yield this.createToken(user, parseInt(expiresInAccessToken, 10));
                const refreshToken = yield this.createToken(user, parseInt(expiresInRefreshToken, 10));
                const newToken = {
                    accessToken,
                    refreshToken,
                    userId: user.id,
                    expiredAt: Date.now() + parseInt(expiresInAccessToken, 10),
                };
                const token = yield Token_1.default.create(newToken);
                return token;
            }
            catch (e) {
                throw new Error(`jwtSign error: ${e}`);
            }
        });
    }
}
exports.default = default_1;
