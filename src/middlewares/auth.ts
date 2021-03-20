import { Response, NextFunction } from "express";
import { IRequest } from "../lib/Request";
import { ApiResponse } from "../lib/ApiResponse";
import Auth from '../lib/Auth';
const auth = new Auth();
export default class {
  static checkAuth = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return new ApiResponse(res).error(401, "UNAUTHORIZED");
      }
      const verify: any = await auth.checkToken(token);

      if (!verify.success) {
        return new ApiResponse(res).error(400, verify.msg);
      }
      if (!verify.data) {
        return new ApiResponse(res).error(401, "UNAUTHORIZED");
      }
      const user = verify.data;
      delete user.iat;
      delete user.exp;

      req.session = {
        user,
      };
      next();
    } catch (e) {
      console.error(e);
      next(e);
    }
  };
}
