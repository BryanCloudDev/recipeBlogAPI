import { type Request, type Response, type NextFunction, type RequestHandler } from 'express'

export interface IFileMiddleWare {
  configMulter: RequestHandler
  validateFile: (req: Request, res: Response, next: NextFunction) => void
}
