import { type ICustomRequest } from '../ICustomRequest'
import { type NextFunction, type Request, type Response } from 'express'
import { type Roles } from '../../services'
import { type IRoleMiddleWare, type IAuthenticationMiddleWare } from '..'

export interface IUserMiddleWare {
  emailExists: (req: ICustomRequest, res: Response, next: NextFunction) => Promise<Response | undefined>
  validateEmailInChange: (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>
  validateFile: (req: Request, res: Response, next: NextFunction) => Response | undefined
  validateRole: (roles: Roles[]) => any
  validateUserId: (req: ICustomRequest, res: Response, next: NextFunction) => Promise<Response | undefined>
  validateUserOnDelete: (req: ICustomRequest, res: Response, next: NextFunction) => Promise<Response | undefined>
  authenticationMiddleware: IAuthenticationMiddleWare
  roleMiddleWare: IRoleMiddleWare
}
