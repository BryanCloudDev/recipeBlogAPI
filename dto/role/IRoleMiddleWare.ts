import { type Response, type NextFunction } from 'express'
import { type ICustomRequest } from '../ICustomRequest'
import { type User } from '../../models'

export interface IRoleMiddleWare {
  validateRoleId: (req: ICustomRequest<User>, res: Response, next: NextFunction) => Promise<Response | undefined>
}
