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

    const isBase64 = this.isBase64(photo)

    if (!isBase64) {
      return isBase64
    }

    const allowedFileExtensions = ['image/jpeg', 'image/png']
    const metaData = photo.split(';base64,')[0]
    const fileExtension = metaData.split(':')[1]

    return allowedFileExtensions.includes(fileExtension)
  }

  isBase64 = (file: string): boolean => {
    const regex = /^data:image\/[a-zA-Z]+;base64,([A-Za-z0-9+/=])+$/
    return regex.test(file)
  }
}
