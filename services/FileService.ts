import { type IFileService } from '../dto'
import fs from 'fs/promises'
import { __dirname } from './utils'
import { Routes } from './enums/Routes'

export class FileService implements IFileService {
  deleteExistingFile = async (pathFile: string): Promise<void> => {
    try {
      if (pathFile !== null) {
        await fs.unlink(`${__dirname}/files/${pathFile}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  buildURLForFile = (route: string, fileName: string): { url: string; path: string } => {
    return {
      url: `${process.env.BASE_URL as string}:${process.env.PORT as string}/${
        Routes.API
      }/${route}/photo/${route}/${fileName}`,
      path: `photo/${route}/${fileName}`
    }
  }
}
