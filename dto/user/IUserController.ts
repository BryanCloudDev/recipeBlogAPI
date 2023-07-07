import { type Response, type Request } from 'express'
import type ICustomRequest from '../request/ICustomRequest'

export default interface IUserController {
  createUser: (req: ICustomRequest, res: Response) => Promise<Response>
  deleteUser: (req: Request, res: Response) => Promise<Response>
  getAllUsers: (req: Request, res: Response) => Promise<Response>
  getUserById: (req: Request, res: Response) => Promise<Response>
  getUserProfile: (req: ICustomRequest, res: Response) => Promise<Response>
}
