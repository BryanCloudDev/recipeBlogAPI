import { type ICustomRequest } from '../ICustomRequest'
import { type NextFunction, type Request, type Response } from 'express'
import { type IRoleMiddleWare, type IAuthenticationMiddleWare, type IFileMiddleWare } from '..'
import { type User } from '../../models'

export interface IUserMiddleWare {
  emailExists: (req: ICustomRequest<User>, res: Response, next: NextFunction) => Promise<Response | undefined>
  validateEmailInChange: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>
  validateUserId: (req: ICustomRequest<User>, res: Response, next: NextFunction) => Promise<Response | undefined>
  validateUserOnDelete: (req: ICustomRequest<User>, res: Response, next: NextFunction) => Promise<Response | undefined>
  authenticationMiddleware: IAuthenticationMiddleWare
  fileMiddleWare: IFileMiddleWare
  roleMiddleWare: IRoleMiddleWare
}
