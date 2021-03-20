import { Request, Response, NextFunction } from 'express'
import { IRequest } from '../lib/Request'
import TodoGroup, { ITodoGroup } from '../models/TodoGroup'
import { ApiResponse } from '../lib/ApiResponse'
import { isValidObjectId } from 'mongoose'

export default class {
  async create(req: IRequest, res: Response, next: NextFunction) {
    try {
      const toDoName: string = req.body.name
      const userId = req.session.user._id

      const existingName = await TodoGroup.findOne({
        author: userId,
        name: toDoName,
      })

      if (existingName) {
        return new ApiResponse(res).error(400, 'TODO_GROUP_EXIST')
      }

      const toDoGroup: { name: string; author: string } = {
        name: req.body.name,
        author: req.session.user._id,
      }

      const savedToDoGroup: ITodoGroup = await TodoGroup.create(toDoGroup)

      return new ApiResponse(res).success(savedToDoGroup)
    } catch (e) {
      return new ApiResponse(res).error(500, 'SERVER_ERROR')
    }
  }

  async getAll(req: IRequest, res: Response, next: NextFunction) {
    try {
      const allToDoGroups = await TodoGroup.find({
        author: req.session.user._id,
      })

      return new ApiResponse(res).success(allToDoGroups)
    } catch (e) {
      return new ApiResponse(res).error(500, 'SERVER_ERROR')
    }
  }

  async getOne(req: IRequest, res: Response, next: NextFunction) {
    try {
      const toDoGroup = await TodoGroup.findById(req.params.id).populate('todos')

      return new ApiResponse(res).success(toDoGroup)
    } catch (e) {
      return new ApiResponse(res).error(500, 'SERVER_ERROR')
    }
  }

  async delete(req: IRequest, res: Response, next: NextFunction) {
    try {
      const todoGroup = await TodoGroup.findByIdAndDelete(req.params.id)
      if (!todoGroup) {
        return new ApiResponse(res).error(
          404,
          `Object not found with id of ${req.params.id}`
        )
      }
      return new ApiResponse(res).success(todoGroup)
    } catch (e) {
      new ApiResponse(res).error(500, 'SERVER_ERROR')
      throw new Error(`Delete TODOGroups error: ${e}`)
    }
  }

  async update(req: IRequest, res: Response) {
    try {
      const todoGroup = await TodoGroup.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      )
      if (!todoGroup) {
        return new ApiResponse(res).error(404, 'TODO_GROUP_NOT_FOUND')
      }
      return new ApiResponse(res).success(todoGroup)
    } catch (e) {
      new ApiResponse(res).error(500, 'SERVER_ERROR')
      throw new Error(`Update TODOGroups error: ${e}`)
    }
  }
}
