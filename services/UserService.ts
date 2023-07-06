import { type QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { type IUserRequest } from '../dto'
import { type User, type Role } from '../models'
import AuthenticationService from './AuthenticationService'
import { userRepository as repository } from '../repositories'

export default class UserService {
  constructor(
    readonly authenticationService = new AuthenticationService(),
    readonly userRepository = repository
  ) {}

  createUserInstanceService = async (userRequest: IUserRequest, role: Role): Promise<User> => {
    try {
      userRequest.password = await this.authenticationService.encrypt(userRequest.password)
      const user = this.userRepository.create({ ...userRequest, role })
      return user
    } catch (error) {
      throw new Error('Error in create user instance service')
    }
  }

  createUserService = async (user: User): Promise<User> => {
    try {
      const createdUser = await this.userRepository.save(user)
      return createdUser
    } catch (error: any) {
      throw new Error('Error in create user service')
    }
  }

  getUserbyIdService = async (id: number): Promise<User | null> => {
    try {
      const user = await this.userRepository.findOne({ where: { id } })
      return user
    } catch (error: any) {
      throw new Error('Error in get user by id service')
    }
  }

  updateUserByIdService = async (id: number, user: QueryDeepPartialEntity<User>): Promise<void> => {
    try {
      await this.userRepository.update(id, user)
    } catch (error: any) {
      throw new Error('Error in update user by id service')
    }
  }

  getAllUsers = async (): Promise<User[]> => {
    try {
      const users = await this.userRepository.find()
      return users
    } catch (error: any) {
      throw new Error('Error in get all users service')
    }
  }
}
