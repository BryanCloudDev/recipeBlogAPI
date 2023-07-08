import { type Repository } from 'typeorm'
import { type User } from '../../models'

export default interface IUserRepository {
  user: Repository<User>
}
