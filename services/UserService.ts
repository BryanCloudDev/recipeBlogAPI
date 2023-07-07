import { type IUserService, type IUserRequest, IAuthenticationService } from '../dto'
import { type QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { type Role, type User } from '../models'
import { injectable, inject } from 'inversify'
import { userRepository } from '../repositories'
import types from './inversify/types'

@injectable()
export default class UserService implements IUserService {
  constructor(
    @inject(types.IAuthenticationService)
    readonly authenticationService: IAuthenticationService
  ) {}

  createUserInstanceService = async (userRequest: IUserRequest, role: Role): Promise<User> => {
    try {
      userRequest.password = await this.authenticationService.encrypt(userRequest.password)
      const user = userRepository.create({ ...userRequest, role })
      return user
    } catch (error) {
      throw new Error('Error in create user instance service')
    }
  }

  createUserService = async (user: User): Promise<User> => {
    try {
      const createdUser = await userRepository.save(user)
      return createdUser
    } catch (error: any) {
      throw new Error('Error in create user service')
    }
  }

  getUserbyIdService = async (id: number): Promise<User | null> => {
    try {
      const user = await userRepository.findOne({ where: { id } })
      return user
    } catch (error: any) {
      throw new Error('Error in get user by id service')
    }
  }

  updateUserByIdService = async (id: number, user: QueryDeepPartialEntity<User>): Promise<void> => {
    try {
      await userRepository.update(id, user)
    } catch (error: any) {
      throw new Error('Error in update user by id service')
    }
  }

  getAllUsers = async (): Promise<User[]> => {
    try {
      const users = await userRepository.find()
      return users
    } catch (error: any) {
      throw new Error('Error in get all users service')
    }
  }
}
