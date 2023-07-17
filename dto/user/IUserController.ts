import { type ICustomRequest } from '../'
import { type Response, type Request } from 'express'

export interface IUserController {
  createUser: (req: ICustomRequest, res: Response) => Promise<Response>
  deleteUser: (req: Request, res: Response) => Promise<Response>
  getAllUsers: (req: Request, res: Response) => Promise<Response>
  getUserById: (req: Request, res: Response) => Promise<Response>
  getUserProfile: (req: ICustomRequest, res: Response) => Promise<Response>
  updateUserPassword: (req: ICustomRequest, res: Response) => Promise<Response>
  updateUserbyId: (req: ICustomRequest, res: Response) => Promise<Response>
}
