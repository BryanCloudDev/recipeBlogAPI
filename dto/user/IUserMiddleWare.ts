import { type NextFunction, type Request, type Response } from 'express'

export interface IUserMiddleWare {
  validateJWT: (req: Request, res: Response, next: NextFunction) => void
}
