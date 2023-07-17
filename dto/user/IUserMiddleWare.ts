import { type ICustomRequest } from '../ICustomRequest'
import { type NextFunction, type Request, type Response } from 'express'
import { type IRoleMiddleWare, type IAuthenticationMiddleWare } from '..'

export interface IUserMiddleWare {
  checkIfRoleIsSent: (role: number) => Promise<void>
  emailExists: (req: ICustomRequest, res: Response, next: NextFunction) => Promise<Response | undefined>
  validateEmailInChange: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>
  validateFile: (req: Request, res: Response, next: NextFunction) => Response | undefined
  validateUserId: (req: ICustomRequest, res: Response, next: NextFunction) => Promise<Response | undefined>
  validateUserOnDelete: (req: ICustomRequest, res: Response, next: NextFunction) => Promise<Response | undefined>
  authenticationMiddleware: IAuthenticationMiddleWare
  roleMiddleWare: IRoleMiddleWare
}
