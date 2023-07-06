import { type Request } from 'express'
import { type Role } from '../../models'

export default interface ICustomRequest extends Request {
  role: Role
}
