import { NextFunction, Router } from 'express'
import Controller from '../controllers/TodoController'
import requestSchema from '../requesSchema/TodoSchema'
import { validate } from '../middlewares/requestValidator'

const router = Router({ mergeParams: true })
const controller = new Controller()

router
  .route('/')
  .post(validate(requestSchema.create), controller.create)
  .get(controller.list)

router
  .route('/:id')
  .get(validate(requestSchema.get), controller.get)
  .put(validate(requestSchema.update), controller.update)
  .delete(validate(requestSchema.delete), controller.delete)

export default router
