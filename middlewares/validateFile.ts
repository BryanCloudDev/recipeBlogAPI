import { type Request, type Response, type NextFunction } from 'express'
import { type IUserRequest } from '../dto'
import { FileService } from '../services'

const fileService = new FileService()

export const validateFile = (req: Request, res: Response, next: NextFunction): Response | undefined => {
  const { photo }: IUserRequest = req.body

  if (photo === undefined) {
    next()
    return
  }

  if (!fileService.isAPhoto(photo)) {
    return res.status(400).json({
      message: 'JPG and PNG images are supported only, and string has to be a valid base64'
    })
  }

  next()
}
