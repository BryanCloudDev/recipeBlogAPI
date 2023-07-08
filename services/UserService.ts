import { type IUserRepository, type IUserService, type IUserRequest, type IAuthenticationService } from '../dto'
import { type QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { type Role, type User } from '../models'
import AuthenticationService from './AuthenticationService'
import UserRepository from '../repositories/UserRespository'

export default class UserService implements IUserService {
  constructor(
    readonly authenticationService: IAuthenticationService = new AuthenticationService(),
    readonly repository: IUserRepository = new UserRepository()
  ) {}

  createUserInstanceService = async (userRequest: IUserRequest, role: Role): Promise<User> => {
    try {
      userRequest.password = await this.authenticationService.encrypt(userRequest.password)
      const user = this.repository.user.create({ ...userRequest, role })
      return user
    } catch (error) {
      throw new Error('Error in create user instance service')
    }
  }

  createUserService = async (user: User): Promise<User> => {
    try {
      const createdUser = await this.repository.user.save(user)
      return createdUser
    } catch (error: any) {
      throw new Error('Error in create user service')
    }
  }

  getUserbyIdService = async (id: number): Promise<User | null> => {
    try {
      const user = await this.repository.user.findOne({ where: { id } })
      return user
    } catch (error: any) {
      throw new Error('Error in get user by id service')
    }
  }

  updateUserByIdService = async (id: number, user: QueryDeepPartialEntity<User>): Promise<void> => {
    try {
      await this.repository.user.update(id, user)
    } catch (error: any) {
      throw new Error('Error in update user by id service')
    }
  }

  getAllUsersService = async (): Promise<User[]> => {
    try {
      const users = await this.repository.user.find()
      return users
    } catch (error: any) {
      throw new Error('Error in get all users service')
    }
  }
}
