import { type Request } from 'express'
import { type User, type Role } from '../models'

export interface ICustomRequest extends Request {
  role: Role
  user: User
}