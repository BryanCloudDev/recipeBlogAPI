import { type Request, type Response, type NextFunction } from 'express'
import { Status } from '../services'

export const validateStatus = (req: Request, res: Response, next: NextFunction): Response | undefined => {
  if (req.body.status === undefined) {
    next()
    return
  }

  const statusId = parseInt(req.body.status)

  if (!(statusId in Status)) {
    return res.status(400).json({
      message: `Status with id ${statusId} is not valid`
    })
  }

  next()
}
