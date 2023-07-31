export interface IFileService {
  deleteExistingFile: (pathFile: string) => Promise<void>
}
