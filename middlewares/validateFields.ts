import { type Request, type Response, type NextFunction } from 'express'
import { validationResult } from 'express-validator'

export const validateFields = (req: Request, res: Response, next: NextFunction): Response | undefined => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }

  next()
}
