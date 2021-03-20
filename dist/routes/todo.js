"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TodoController_1 = __importDefault(require("../controllers/TodoController"));
const TodoSchema_1 = __importDefault(require("../requesSchema/TodoSchema"));
const requestValidator_1 = require("../middlewares/requestValidator");
const router = express_1.Router({ mergeParams: true });
const controller = new TodoController_1.default();
router
    .route('/')
    .post(requestValidator_1.validate(TodoSchema_1.default.create), controller.create)
    .get(controller.list);
router
    .route('/:id')
    .get(requestValidator_1.validate(TodoSchema_1.default.get), controller.get)
    .put(requestValidator_1.validate(TodoSchema_1.default.update), controller.update)
    .delete(requestValidator_1.validate(TodoSchema_1.default.delete), controller.delete);
exports.default = router;
