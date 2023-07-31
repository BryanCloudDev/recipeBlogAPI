import { type Response, type NextFunction } from 'express'
import { type ICustomRequest, type IAuthenticationMiddleWare, type IUserMiddleWare, type IFileMiddleWare } from '..'
import { type Recipe } from '../../models'

export interface IRecipeMiddleWare {
  validateRecipeId: (req: ICustomRequest<Recipe>, res: Response, next: NextFunction) => Promise<Response | undefined>
  validateRecipeOnDelete: (
    req: ICustomRequest<Recipe>,
    res: Response,
    next: NextFunction
  ) => Promise<Response | undefined>
  authenticationMiddleware: IAuthenticationMiddleWare
  fileMiddleWare: IFileMiddleWare
  userMiddleware: IUserMiddleWare
}
