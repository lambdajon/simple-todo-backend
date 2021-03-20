"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schema = {
    create: joi_1.default.object().keys({
        body: joi_1.default.object()
            .keys({
            name: joi_1.default.string(),
        })
            .required(),
    }),
    update: joi_1.default.object().keys({
        params: joi_1.default.object().keys({
            id: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/),
        }),
        body: joi_1.default.object()
            .keys({
            name: joi_1.default.string(),
        })
            .required(),
    }),
    get: joi_1.default.object().keys({
        params: joi_1.default.object().keys({
            id: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/),
        }),
    }),
    delete: joi_1.default.object().keys({
        params: joi_1.default.object().keys({
            id: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/),
        }),
    }),
};
exports.default = schema;
