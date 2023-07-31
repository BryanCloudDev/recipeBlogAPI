import { type Request } from 'express'
import { type User, type Role, type Recipe } from '../models'
import { type IFilter } from '.'

export interface ICustomRequest<T> extends Request {
  role: Role
  user: User
  recipe: Recipe
  filter: IFilter<T> | undefined
}
