"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router({ mergeParams: true });
const auth_1 = __importDefault(require("./auth"));
const todoGroup_1 = __importDefault(require("./todoGroup"));
const todo_1 = __importDefault(require("./todo"));
const auth_2 = __importDefault(require("../middlewares/auth"));
router.use("/auth", auth_1.default);
router.use("/todo-groups", auth_2.default.checkAuth, todoGroup_1.default);
router.use("/todo", auth_2.default.checkAuth, todo_1.default);
exports.default = router;
