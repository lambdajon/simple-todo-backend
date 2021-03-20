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
const TodoGroup_1 = __importDefault(require("../models/TodoGroup"));
const ApiResponse_1 = require("../lib/ApiResponse");
class default_1 {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const toDoName = req.body.name;
                const userId = req.session.user._id;
                const existingName = yield TodoGroup_1.default.findOne({
                    author: userId,
                    name: toDoName,
                });
                if (existingName) {
                    return new ApiResponse_1.ApiResponse(res).error(400, 'TODO_GROUP_EXIST');
                }
                const toDoGroup = {
                    name: req.body.name,
                    author: req.session.user._id,
                };
                const savedToDoGroup = yield TodoGroup_1.default.create(toDoGroup);
                return new ApiResponse_1.ApiResponse(res).success(savedToDoGroup);
            }
            catch (e) {
                return new ApiResponse_1.ApiResponse(res).error(500, 'SERVER_ERROR');
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allToDoGroups = yield TodoGroup_1.default.find({
                    author: req.session.user._id,
                });
                return new ApiResponse_1.ApiResponse(res).success(allToDoGroups);
            }
            catch (e) {
                return new ApiResponse_1.ApiResponse(res).error(500, 'SERVER_ERROR');
            }
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const toDoGroup = yield TodoGroup_1.default.findById(req.params.id).populate('todos');
                return new ApiResponse_1.ApiResponse(res).success(toDoGroup);
            }
            catch (e) {
                return new ApiResponse_1.ApiResponse(res).error(500, 'SERVER_ERROR');
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todoGroup = yield TodoGroup_1.default.findByIdAndDelete(req.params.id);
                if (!todoGroup) {
                    return new ApiResponse_1.ApiResponse(res).error(404, `Object not found with id of ${req.params.id}`);
                }
                return new ApiResponse_1.ApiResponse(res).success(todoGroup);
            }
            catch (e) {
                new ApiResponse_1.ApiResponse(res).error(500, 'SERVER_ERROR');
                throw new Error(`Delete TODOGroups error: ${e}`);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todoGroup = yield TodoGroup_1.default.findByIdAndUpdate(req.params.id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!todoGroup) {
                    return new ApiResponse_1.ApiResponse(res).error(404, 'TODO_GROUP_NOT_FOUND');
                }
                return new ApiResponse_1.ApiResponse(res).success(todoGroup);
            }
            catch (e) {
                new ApiResponse_1.ApiResponse(res).error(500, 'SERVER_ERROR');
                throw new Error(`Update TODOGroups error: ${e}`);
            }
        });
    }
}
exports.default = default_1;
