import { type IUserRequest } from './'
import { type QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { type Role, type User } from '../../models'

export interface IUserService {
  createUserInstanceService: (userRequest: IUserRequest, role: Role) => Promise<User>
  createUserService: (user: User) => Promise<User>
  getAllUsersService: () => Promise<User[]>
  getUserbyIdService: (id: number) => Promise<User | null>
  updateUserByIdService: (id: number, user: QueryDeepPartialEntity<User>) => Promise<void>
}
