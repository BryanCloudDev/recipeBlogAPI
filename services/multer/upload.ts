import multer from 'multer'
import { storage } from './storage'

export const upload = (folder: string): multer.Multer => {
  return multer({
    storage: storage(folder)
  })
}
