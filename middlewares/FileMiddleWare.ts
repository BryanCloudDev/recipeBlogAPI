import { type Response, type NextFunction, type RequestHandler, type Request } from 'express'
import { upload } from '../services/multer'
import { type IFileMiddleWare } from '../dto/file'

export class FileMiddleWare implements IFileMiddleWare {
  readonly configMulter: RequestHandler

  constructor(folder: string) {
    this.configMulter = upload(folder).single('photo')
  }

  public validateFile = (req: Request, res: Response, next: NextFunction): void => {
    this.configMulter(req, res, (err: any) => {
      if (err !== undefined) {
        return res.json({
          message: err.message
        })
      }
      next()
    })
  }
}
