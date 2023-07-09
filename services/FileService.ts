import { type IFileService } from '../dto'

export default class FileService implements IFileService {
  convertFileToBuffer = (file: string | undefined): Buffer | undefined => {
    try {
      if (file === undefined) return file

      const photoBuffer = Buffer.from(file)

      return photoBuffer
    } catch (error) {
      throw new Error('Error in create file to buffer service')
    }
  }
}
