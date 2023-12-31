import { type IURLResponse } from '.'

export interface IFileService {
  deleteExistingFile: (pathFile: string) => Promise<void>
  buildURLForFile: (route: string, fileName: string) => IURLResponse
}
