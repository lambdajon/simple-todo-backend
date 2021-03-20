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
const Todo_1 = __importDefault(require("../models/Todo"));
const TodoGroup_1 = __importDefault(require("../models/TodoGroup"));
const ApiResponse_1 = require("../lib/ApiResponse");
class default_1 {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const group = yield TodoGroup_1.default.findById(req.body.groupId);
                if (!group) {
                    return new ApiResponse_1.ApiResponse(res).error(404, 'TODO_GROUP_NOT_FOUND');
                }
                req.body.author = req.session.user._id;
                const todo = yield Todo_1.default.create(Object.assign(Object.assign({}, req.body), { group: req.body.groupId }));
                group.todos.push(todo.id);
                yield group.save();
                return new ApiResponse_1.ApiResponse(res).success(todo);
            }
            catch (e) {
                new ApiResponse_1.ApiResponse(res).error(404, 'SERVER_ERROR');
                throw new Error(`Error: ${e}`);
            }
        });
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todos = yield Todo_1.default.find({ author: req.session.user._id });
                return new ApiResponse_1.ApiResponse(res).success(todos);
            }
            catch (e) {
                return new ApiResponse_1.ApiResponse(res).error(500, 'SERVER_ERROR');
            }
        });
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todo = yield Todo_1.default.findOne({ _id: req.params.id });
                if (!todo) {
                    return new ApiResponse_1.ApiResponse(res).error(404, 'TODO_NOT_FOUND');
                }
                return new ApiResponse_1.ApiResponse(res).success(todo);
            }
            catch (e) {
                return new ApiResponse_1.ApiResponse(res).error(500, 'SERVER_ERROR');
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todo = yield Todo_1.default.findByIdAndUpdate(req.params.id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!todo) {
                    return new ApiResponse_1.ApiResponse(res).error(404, 'TODO_NOT_FOUND');
                }
                return new ApiResponse_1.ApiResponse(res).success(todo);
            }
            catch (e) {
                new ApiResponse_1.ApiResponse(res).error(500, 'SERVER_ERROR');
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todo = yield Todo_1.default.findByIdAndDelete(req.params.id);
                if (!todo) {
                    return new ApiResponse_1.ApiResponse(res).error(404, 'TODO_GROUP_NOT_FOUND');
                }
                return new ApiResponse_1.ApiResponse(res).success(todo);
            }
            catch (e) {
                new ApiResponse_1.ApiResponse(res).error(500, 'SERVER_ERROR');
            }
        });
    }
}
exports.default = default_1;
