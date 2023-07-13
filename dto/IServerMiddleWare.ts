import { type Request, type Response, type NextFunction } from 'express'

export interface IServerMiddleWare {
  validateJSON: (err: any, req: Request, res: Response, next: NextFunction) => Response | undefined
  validateEnvForDocs: (req: Request, res: Response, next: NextFunction) => Response | undefined
}
