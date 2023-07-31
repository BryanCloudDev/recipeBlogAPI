export interface IFileService {
  deleteExistingFile: (pathFile: string) => Promise<void>
  buildURLForFile: (route: string, fileName: string) => { url: string; path: string }
}
