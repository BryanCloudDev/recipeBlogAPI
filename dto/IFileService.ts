export interface IFileService {
  convertFileToBuffer: (file: string | undefined) => Buffer | undefined
  isAPhoto: (photo: string) => boolean
}
