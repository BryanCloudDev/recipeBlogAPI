import { type IURLResponse, type IFileService } from '../dto'
import fs from 'fs/promises'
import { __dirname } from './utils'
import { Routes } from './enums/Routes'
import { LoggerService } from './LoggerService'

export class FileService implements IFileService {
  public deleteExistingFile = async (pathFile: string): Promise<void> => {
    try {
      if (pathFile !== null) {
        await fs.unlink(`${__dirname}/files/${pathFile}`)
      }
    } catch (error) {
      LoggerService.errorMessageHandler(error, 'Error in create user controller')
    }
  }

  public buildURLForFile = (route: string, fileName: string): IURLResponse => {
    return {
      url: `${process.env.BASE_URL as string}:${process.env.PORT as string}/${
        Routes.API
      }/${route}/photo/${route}/${fileName}`,
      path: `photo/${route}/${fileName}`
    }
  }
}
