import { type ICustomRequest } from '../ICustomRequest'
import { type NextFunction, type Request, type Response } from 'express'

export interface IUserMiddleWare {
  emailExists: (req: ICustomRequest, res: Response, next: NextFunction) => Promise<Response | undefined>
  isAPhoto: (file: string) => boolean
  validateEmailInChange: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>
  validateUserId: (req: ICustomRequest, res: Response, next: NextFunction) => Promise<Response | undefined>
  validateUserOnDelete: (req: ICustomRequest, res: Response, next: NextFunction) => Promise<Response | undefined>
}
