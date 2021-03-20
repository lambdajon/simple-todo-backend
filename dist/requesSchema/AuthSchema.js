"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schema = {
    signUp: joi_1.default.object().keys({
        body: joi_1.default.object()
            .keys({
            username: joi_1.default.string(),
            firstName: joi_1.default.string(),
            lastName: joi_1.default.string(),
            email: joi_1.default.string().email(),
            password: joi_1.default.string(),
            confirmPassword: joi_1.default.ref("password"),
        })
            .required(),
    }),
    login: joi_1.default.object().keys({
        body: joi_1.default.object()
            .keys({
            username: joi_1.default.string().optional(),
            email: joi_1.default.string().email().optional(),
            password: joi_1.default.string().required(),
        })
            .or("username", "email"),
    }),
    verify: joi_1.default.object().keys({
        query: joi_1.default.object()
            .keys({
            code: joi_1.default.string().required(),
        })
    }),
};
exports.default = schema;
