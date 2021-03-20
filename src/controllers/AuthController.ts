import { Request, Response, NextFunction } from 'express'
import User, { IUser } from '../models/User'
import { ApiResponse } from '../lib/ApiResponse'
import Auth from '../lib/Auth'
import verifyEmail from '../lib/verifyEmail'
export default class {
  auth: Auth
  constructor() {
    this.auth = new Auth()
  }
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const existingUser: IUser = await User.findOne({ email: req.body.email })
      if (existingUser) {
        return new ApiResponse(res).error(400, 'USER_EXIST')
      }
      let verifyCode: string = verifyEmail()
      req.body.verifyCode = verifyCode
      const savedUser: IUser = await User.create(req.body)
      return new ApiResponse(res).success(savedUser)
    } catch (e) {
      return new ApiResponse(res).error(500, 'SERVER_ERROR')
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body

      console.log(undefined === undefined)

      const query = {
        $or: [],
      }

      if (data.email) {
        query.$or.push({ email: data.email })
      }
      if (data.username) {
        query.$or.push({ username: data.username })
      }

      const user = await User.findOne(query).lean()

      if (!user) {
        return new ApiResponse(res).error(400, 'INVALID_CREDINTIALS')
      }
      const password: string = user.password || ''
      const checkUser: boolean | Error = await this.auth.checkUserPassword(
        data.password,
        password
      )

      if (!checkUser) {
        return new ApiResponse(res).error(400, 'INVALID_CREDINTIALS')
      }
      const existingUser = { ...user }
      delete existingUser.password
      const tokens = await this.auth.jwtSign(existingUser)

      const userData = {
        user: existingUser,
        tokens: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      }
      return new ApiResponse(res).success(userData)
    } catch (e) {
      new ApiResponse(res).error(500, 'SERVER_ERROR')
      throw new Error(`Login eror: ${e}`)
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const user: IUser = await User.findOne({ verifyCode: req.query.code })
      if (!user) {
        new ApiResponse(res).error(404, 'NOT_FOUND')
      }
      const userVerify: IUser = await User.findByIdAndUpdate(
        user._id,
        { verify: true },
        {
          new: true,
          runValidators: true,
        }
      )
      return new ApiResponse(res).success(userVerify)
    } catch (e) {
      return new ApiResponse(res).error(500, 'SERVER_ERROR')
    }
  }
}
