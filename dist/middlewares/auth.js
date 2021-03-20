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
const ApiResponse_1 = require("../lib/ApiResponse");
const Auth_1 = __importDefault(require("../lib/Auth"));
const auth = new Auth_1.default();
class default_1 {
}
exports.default = default_1;
default_1.checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return new ApiResponse_1.ApiResponse(res).error(401, "UNAUTHORIZED");
        }
        const verify = yield auth.checkToken(token);
        if (!verify.success) {
            return new ApiResponse_1.ApiResponse(res).error(400, verify.msg);
        }
        if (!verify.data) {
            return new ApiResponse_1.ApiResponse(res).error(401, "UNAUTHORIZED");
        }
        const user = verify.data;
        delete user.iat;
        delete user.exp;
        req.session = {
            user,
        };
        next();
    }
    catch (e) {
        console.error(e);
        next(e);
    }
});
