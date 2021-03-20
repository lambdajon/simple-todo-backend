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
const User_1 = __importDefault(require("../models/User"));
const ApiResponse_1 = require("../lib/ApiResponse");
const Auth_1 = __importDefault(require("../lib/Auth"));
const verifyEmail_1 = __importDefault(require("../lib/verifyEmail"));
class default_1 {
    constructor() {
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                console.log(undefined === undefined);
                const query = {
                    $or: [],
                };
                if (data.email) {
                    query.$or.push({ email: data.email });
                }
                if (data.username) {
                    query.$or.push({ username: data.username });
                }
                const user = yield User_1.default.findOne(query).lean();
                if (!user) {
                    return new ApiResponse_1.ApiResponse(res).error(400, 'INVALID_CREDINTIALS');
                }
                const password = user.password || '';
                const checkUser = yield this.auth.checkUserPassword(data.password, password);
                if (!checkUser) {
                    return new ApiResponse_1.ApiResponse(res).error(400, 'INVALID_CREDINTIALS');
                }
                const existingUser = Object.assign({}, user);
                delete existingUser.password;
                const tokens = yield this.auth.jwtSign(existingUser);
                const userData = {
                    user: existingUser,
                    tokens: {
                        accessToken: tokens.accessToken,
                        refreshToken: tokens.refreshToken,
                    },
                };
                return new ApiResponse_1.ApiResponse(res).success(userData);
            }
            catch (e) {
                new ApiResponse_1.ApiResponse(res).error(500, 'SERVER_ERROR');
                throw new Error(`Login eror: ${e}`);
            }
        });
        this.auth = new Auth_1.default();
    }
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield User_1.default.findOne({ email: req.body.email });
                if (existingUser) {
                    return new ApiResponse_1.ApiResponse(res).error(400, 'USER_EXIST');
                }
                let verifyCode = verifyEmail_1.default();
                req.body.verifyCode = verifyCode;
                const savedUser = yield User_1.default.create(req.body);
                return new ApiResponse_1.ApiResponse(res).success(savedUser);
            }
            catch (e) {
                return new ApiResponse_1.ApiResponse(res).error(500, 'SERVER_ERROR');
            }
        });
    }
    verifyEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({ verifyCode: req.query.code });
                if (!user) {
                    new ApiResponse_1.ApiResponse(res).error(404, 'NOT_FOUND');
                }
                const userVerify = yield User_1.default.findByIdAndUpdate(user._id, { verify: true }, {
                    new: true,
                    runValidators: true,
                });
                return new ApiResponse_1.ApiResponse(res).success(userVerify);
            }
            catch (e) {
                return new ApiResponse_1.ApiResponse(res).error(500, 'SERVER_ERROR');
            }
        });
    }
}
exports.default = default_1;
