import {
  type IUserService,
  type IAuthenticationService,
  type IUserRepository,
  type IUserRequest,
  type IFileService
} from '../dto'
import { type QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { type Role, type User } from '../models'
import { AuthenticationService, FileService } from './'
import { UserRepository } from '../repositories'

export class UserService implements IUserService {
  constructor(
    private readonly authenticationService: IAuthenticationService = new AuthenticationService(),
    private readonly fileService: IFileService = new FileService(),
    private readonly repository: IUserRepository = new UserRepository()
  ) {}

  public createUserInstanceService = async (userRequest: IUserRequest, role: Role): Promise<User> => {
    try {
      const { photo } = userRequest
      const photoBuffer = this.fileService.convertFileToBuffer(photo)

      userRequest.password = await this.authenticationService.encrypt(userRequest.password)
      const user = this.repository.user.create({ ...userRequest, role, photo: photoBuffer })
      return user
    } catch (error) {
      throw new Error('Error in create user instance service')
    }
  }

  public createUserService = async (user: User): Promise<User> => {
    try {
      const createdUser = await this.repository.user.save(user)
      return createdUser
    } catch (error: any) {
      throw new Error('Error in create user service')
    }
  }

  public getUserbyIdService = async (id: number): Promise<User | null> => {
    try {
      const user = await this.repository.user.findOne({ where: { id } })
      return user
    } catch (error: any) {
      throw new Error('Error in get user by id service')
    }
  }

  public updateUserByIdService = async (id: number, user: QueryDeepPartialEntity<User>): Promise<void> => {
    try {
      await this.repository.user.update(id, user)
    } catch (error: any) {
      throw new Error('Error in update user by id service')
    }
  }

  public getAllUsersService = async (): Promise<User[]> => {
    try {
      const users = await this.repository.user.find()
      return users
    } catch (error: any) {
      throw new Error('Error in get all users service')
    }
  }
}
