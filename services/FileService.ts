import { type IFileService } from '../dto'
import { LoggerService } from './'

export class FileService implements IFileService {
  convertFileToBuffer = (file: string | undefined): Buffer | undefined => {
    try {
      if (file === undefined) return file

      const photoBuffer = Buffer.from(file)

      return photoBuffer
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in create file to buffer service').message)
    }
  }

  isAPhoto = (photo: string): boolean => {
    if (photo === undefined) {
      return true
    }
    const allowedFileExtensions = ['image/jpeg', 'image/png']
    const metaData = photo.split(';base64,')[0]
    const fileExtension = metaData.split(':')[1]

    return allowedFileExtensions.includes(fileExtension)
  }
}
