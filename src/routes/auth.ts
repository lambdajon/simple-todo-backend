import { NextFunction, Router } from 'express'
import Controller from '../controllers/AuthController'
import requestSchema from '../requesSchema/AuthSchema'
import { validate } from '../middlewares/requestValidator'
import Auth from '../middlewares/auth'
const router = Router({ mergeParams: true })
const controller = new Controller()

router.post('/register', validate(requestSchema.signUp), controller.signUp)
router.post('/login', validate(requestSchema.login), controller.login)
router.get('/verify', validate(requestSchema.verify), controller.verifyEmail)

export default router