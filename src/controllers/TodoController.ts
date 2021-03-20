import { Request, Response, NextFunction } from 'express'
import { IRequest } from '../lib/Request'
import Todo, { ITodo } from '../models/Todo'
import TodoGroup, { ITodoGroup } from '../models/TodoGroup'
import { ApiResponse } from '../lib/ApiResponse'

export default class {
  async create(req: IRequest, res: Response, next: NextFunction) {
    try {
      const group: ITodoGroup = await TodoGroup.findById(req.body.groupId)
      if (!group) {
        return new ApiResponse(res).error(404, 'TODO_GROUP_NOT_FOUND')
      }
      req.body.author = req.session.user._id
      const todo: ITodo = await Todo.create({...req.body, group: req.body.groupId})
      group.todos.push(todo.id)
      await group.save()
      return new ApiResponse(res).success(todo)
    } catch (e) {
      new ApiResponse(res).error(404, 'SERVER_ERROR')
      throw new Error(`Error: ${e}`)
    }
  }

  async list(req: IRequest, res: Response, next: NextFunction) {
    try {
      const todos = await Todo.find({ author: req.session.user._id })
      return new ApiResponse(res).success(todos)
    } catch (e) {
      return new ApiResponse(res).error(500, 'SERVER_ERROR')
    }
  }

  async get(req: IRequest, res: Response, next: NextFunction) {
    try {
      const todo = await Todo.findOne({ _id: req.params.id })
      if (!todo) {
        return new ApiResponse(res).error(404, 'TODO_NOT_FOUND')
      }
      return new ApiResponse(res).success(todo)
    } catch (e) {
      return new ApiResponse(res).error(500, 'SERVER_ERROR')
    }
  }

  async update(req: IRequest, res: Response, next: NextFunction) {
    try {
      const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })
      if (!todo) {
        return new ApiResponse(res).error(404, 'TODO_NOT_FOUND')
      }
      return new ApiResponse(res).success(todo)
    } catch (e) {
      new ApiResponse(res).error(500, 'SERVER_ERROR')
    }
  }

  async delete(req: IRequest, res: Response, next: NextFunction) {
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id)
      if (!todo) {
        return new ApiResponse(res).error(404, 'TODO_GROUP_NOT_FOUND')
      }
      return new ApiResponse(res).success(todo)
    } catch (e) {
      new ApiResponse(res).error(500, 'SERVER_ERROR')
    }
  }
}
