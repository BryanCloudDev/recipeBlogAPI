import { type NextFunction, type Request, type Response } from 'express'

export interface IAuthorizationController {
  login: (req: Request, res: Response, next: NextFunction) => void
}
