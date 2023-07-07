import { injectable } from 'inversify'
import { AppDataSource } from '../database'
import type IUserRepository from '../dto/user/IUserRepository'
import { User } from '../models'

@injectable()
export default class UserRepository implements IUserRepository {
  user = AppDataSource.getRepository(User)
}
