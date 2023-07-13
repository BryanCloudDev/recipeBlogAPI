import { type Request, type Response, type NextFunction } from 'express'

export interface IAuthenticationMiddleWare {
  validateJWT: (req: Request, res: Response, next: NextFunction) => void
}
