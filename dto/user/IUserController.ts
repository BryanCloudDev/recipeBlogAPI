import { type ICustomRequest } from '../'
import { type Response, type Request } from 'express'
import { type User } from '../../models'

export interface IUserController {
  createUser: (req: ICustomRequest<User>, res: Response) => Promise<Response>
  deleteUserById: (req: Request, res: Response) => Promise<Response>
  getAllUsers: (req: Request, res: Response) => Promise<Response>
  getUserById: (req: Request, res: Response) => Promise<Response>
  getUserProfile: (req: ICustomRequest<User>, res: Response) => Promise<Response>
  updateUserPassword: (req: ICustomRequest<User>, res: Response) => Promise<Response>
  updateUserbyId: (req: ICustomRequest<User>, res: Response) => Promise<Response>
  uploadPhoto: (req: ICustomRequest<User>, res: Response) => Promise<Response>
}
