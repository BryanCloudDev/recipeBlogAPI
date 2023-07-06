import { type Request } from 'express'
import { type User, type Role } from '../../models'

export default interface ICustomRequest extends Request {
  role: Role
  user: User
}
