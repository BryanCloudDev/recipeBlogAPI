import { type Request } from 'express'
import { type User, type Role, type Recipe } from '../models'

export interface ICustomRequest extends Request {
  role: Role
  user: User
  recipe: Recipe
}
