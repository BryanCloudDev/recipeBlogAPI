import multer from 'multer'
import path from 'path'
import { __dirname } from '../index'
import { type Request } from 'express'
import { v4 } from 'uuid'

export const storage = (folder: string): multer.StorageEngine => {
  return multer.diskStorage({
    destination: path.join(__dirname, `files/photo/${folder}`),

    filename(req: Request, file: Express.Multer.File, cb: any) {
      const [, extension] = file.mimetype.split('/')
      cb(null, `${v4()}.${extension.toLowerCase()}`)
    }
  })
}
