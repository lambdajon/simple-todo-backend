import { Response } from 'express'

export class ApiResponse {
  constructor(private res: Response) {
    this.res = res
  }
  success(resData: any) {
    this.res.send({
      message: 'OK',
      data: resData,
    })
  }
  error(statusCode: number, errorMessage: string, errors?: any) {
    this.res.status(statusCode).send({
      message: errorMessage,
      errors,
    })
  }
}
