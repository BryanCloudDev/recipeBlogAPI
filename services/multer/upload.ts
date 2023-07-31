import multer from 'multer'
import { storage } from './storage'
import { type Request } from 'express'
import path from 'path'

export const upload = (folder: string): multer.Multer => {
  return multer({
    storage: storage(folder),
    limits: {
      fileSize: 2000000,
      files: 1
    },
    fileFilter
  })
}

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
  const fileTypes = /jpeg|jpg|gif|png/
  const extension = path.extname(file.originalname).slice(1).toLocaleLowerCase()
  const isFileValid = fileTypes.test(extension)

  if (isFileValid) {
    cb(null, true)
    return
  }

  cb(new Error(`The file type ${extension} is not valid`))
}
