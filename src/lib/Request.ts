import { Request } from "express";
import { IUser } from "../models/User";
interface ISession {
  user?: IUser;
}

export interface IRequest extends Request {
  session?: ISession;
}
