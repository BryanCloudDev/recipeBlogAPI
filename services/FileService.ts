import { type IFileService } from '../dto'
import fs from 'fs/promises'
import { __dirname } from './utils'

export class FileService implements IFileService {
  deleteExistingFile = async (pathFile: string): Promise<void> => {
    try {
      if (pathFile !== undefined) {
        await fs.unlink(`${__dirname}/files/${pathFile}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
