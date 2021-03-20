"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TodoGroupController_1 = __importDefault(require("../controllers/TodoGroupController"));
const TodoGroupSchema_1 = __importDefault(require("../requesSchema/TodoGroupSchema"));
const requestValidator_1 = require("../middlewares/requestValidator");
const router = express_1.Router({ mergeParams: true });
const controller = new TodoGroupController_1.default();
router
    .route('/')
    .post(requestValidator_1.validate(TodoGroupSchema_1.default.create), controller.create)
    .get(controller.getAll);
router
    .route('/:id')
    .get(requestValidator_1.validate(TodoGroupSchema_1.default.get), controller.getOne)
    .put(requestValidator_1.validate(TodoGroupSchema_1.default.update), controller.update)
    .delete(requestValidator_1.validate(TodoGroupSchema_1.default.delete), controller.delete);
exports.default = router;
