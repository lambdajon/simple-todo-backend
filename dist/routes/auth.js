"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const AuthSchema_1 = __importDefault(require("../requesSchema/AuthSchema"));
const requestValidator_1 = require("../middlewares/requestValidator");
const router = express_1.Router({ mergeParams: true });
const controller = new AuthController_1.default();
router.post('/register', requestValidator_1.validate(AuthSchema_1.default.signUp), controller.signUp);
router.post('/login', requestValidator_1.validate(AuthSchema_1.default.login), controller.login);
router.get('/verify', requestValidator_1.validate(AuthSchema_1.default.verify), controller.verifyEmail);
exports.default = router;
