import { type IServerMiddleWare } from '../dto'
import { type Request, type Response, type NextFunction } from 'express'

export class ServerMiddleWare implements IServerMiddleWare {
  constructor() {}

  validateJSON = (err: any, req: Request, res: Response, next: NextFunction): Response | undefined => {
    if (err instanceof SyntaxError && 'body' in err) {
      return res.status(400).send({ message: err.message }) // Bad request
    }
    next()
  }

  validateEnvForDocs = (req: Request, res: Response, next: NextFunction): Response | undefined => {
    const enviroment = process.env.NODE_ENV
    if (enviroment !== undefined && enviroment !== 'development') {
      return res.status(403).json({
        message: 'Page cannot be accesed'
      })
    }
    next()
  }
}
