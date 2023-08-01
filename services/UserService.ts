import {
  type IUserService,
  type IAuthenticationService,
  type IUserRepository,
  type IUserRequest,
  type IFileService,
  type IFilter
} from '../dto'
import { type Role, type User } from '../models'
import { AuthenticationService, FileService, LoggerService } from './'
import { UserRepository } from '../repositories'

export class UserService implements IUserService {
  readonly fileService: IFileService

  constructor(
    private readonly authenticationService: IAuthenticationService = new AuthenticationService(),
    private readonly _fileService: IFileService = new FileService(),
    private readonly repository: IUserRepository = new UserRepository()
  ) {
    this.fileService = _fileService
  }

  public createUserInstanceService = async (userRequest: IUserRequest, role: Role): Promise<User> => {
    try {
      userRequest.password = await this.authenticationService.encrypt(userRequest.password)
      const user = this.repository.user.create({
        ...userRequest,
        role
      })
      return user
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in create user instance service').message)
    }
  }

  public createUserService = async (user: User): Promise<number> => {
    try {
      const createdUser = await this.repository.user.save(user)
      return createdUser.id
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in create user service').message)
    }
  }

  public getUserbyIdService = async (id: number): Promise<User | null> => {
    try {
      const user = await this.repository.user.findOne({ where: { id } })
      return user
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in get user by id service').message)
    }
  }

  public updateUserByIdService = async (id: number, user: Partial<IUserRequest>, role?: Role): Promise<void> => {
    try {
      const { roleId, ...userRequest } = user

      await this.repository.user.update(id, {
        ...userRequest
      })
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in update user by id service').message)
    }
  }

  public getAllUsersService = async (filter?: IFilter<User>): Promise<{ users: User[]; count: number }> => {
    try {
      const usersPromise = await this.repository.user.find(
        filter !== undefined
          ? {
              where: filter.where,
              skip: filter.offset,
              take: filter.limit,
              select: filter.select,
              order: filter.order,
              relations: filter.relations
            }
          : {}
      )

      const countPromise = this.repository.user.count(filter !== undefined ? { where: filter.where } : undefined)

      const [users, count] = await Promise.all([usersPromise, countPromise])

      return { users, count }
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in get all users service').message)
    }
  }

  public updateUserPasswordService = async (
    user: User,
    currentPassword: string,
    newPassword: string
  ): Promise<string | undefined> => {
    const { password } = user

    const resultPasswordCheck = await this.authenticationService.checkPassword(currentPassword, password)

    if (!resultPasswordCheck) {
      return 'Current password does not match'
    }

    const newPasswordHash = await this.authenticationService.encrypt(newPassword)

    await this.updateUserByIdService(user.id, { password: newPasswordHash })
  }

  public getUserByEmail = async (email: string): Promise<User | null> => {
    try {
      const user = await this.repository.user.findOne({ where: { email } })
      return user
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in get all users service').message)
    }
  }
}
