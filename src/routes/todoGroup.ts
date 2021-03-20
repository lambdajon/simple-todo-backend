import { Router } from 'express'
import Controller from '../controllers/TodoGroupController'
import requestSchema from '../requesSchema/TodoGroupSchema'
import { validate } from '../middlewares/requestValidator'
const router = Router({ mergeParams: true })
const controller = new Controller()

router
  .route('/')
  .post(validate(requestSchema.create), controller.create)
  .get(controller.getAll)

router
  .route('/:id')
  .get(validate(requestSchema.get), controller.getOne)
  .put(validate(requestSchema.update), controller.update)
  .delete(validate(requestSchema.delete), controller.delete)

export default router
