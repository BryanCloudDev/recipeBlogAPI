import { type Request, type Response, type NextFunction } from 'express'
import { type Roles } from '../../services'

export interface IAuthenticationMiddleWare {
  validateJWT: (req: Request, res: Response, next: NextFunction) => void
  validateRole: (roles: Roles[]) => any
}
