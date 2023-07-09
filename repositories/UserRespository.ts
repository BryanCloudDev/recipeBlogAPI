import { type IUserRepository } from '../dto'
import { type Repository } from 'typeorm'
import { type User } from '../models'
import { userRepository } from './repositories'

export class UserRepository implements IUserRepository {
  constructor(readonly user: Repository<User> = userRepository) {}
}
