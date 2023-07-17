import { type Response, type NextFunction } from 'express'
import { type ICustomRequest, type IAuthenticationMiddleWare, type IUserMiddleWare } from '..'

export interface IRecipeMiddleWare {
  validateRecipeId: (req: ICustomRequest, res: Response, next: NextFunction) => Promise<Response | undefined>
  authenticationMiddleware: IAuthenticationMiddleWare
  userMiddleware: IUserMiddleWare
}
