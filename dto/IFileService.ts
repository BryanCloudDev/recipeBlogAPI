export interface IFileService {
  convertFileToBuffer: (file: string | undefined) => Buffer | undefined
}
