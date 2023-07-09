import { type Repository } from 'typeorm'
import { type User } from '../../models'

export interface IUserRepository {
  user: Repository<User>
}
