import { type Response, type NextFunction } from 'express'
import { type ICustomRequest } from '../ICustomRequest'

export interface IRoleMiddleWare {
  validateRoleId: (req: ICustomRequest, res: Response, next: NextFunction) => Promise<Response | undefined>
}
