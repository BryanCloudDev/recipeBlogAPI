import path from 'path'
import { type IFileService } from '../dto'
import fs from 'fs/promises'

export class FileService implements IFileService {
  deleteExistingFile = async (pathFile: string): Promise<void> => {
    try {
      if (pathFile !== undefined) {
        await fs.unlink(path.resolve(`/files${pathFile}`))
      }
    } catch (error) {
      console.log(error)
    }
  }
}
