import { type Repository } from 'typeorm'
import { type IUserRepository } from '../dto'
import { type User } from '../models'
import { userRepository } from '.'

export default class UserRepository implements IUserRepository {
  constructor(readonly user: Repository<User> = userRepository) {}
}
