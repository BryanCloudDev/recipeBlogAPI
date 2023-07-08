import { type QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { type Role, type User } from '../../models'
import type IUserRequest from './IUserRequest'

export default interface IUserService {
  createUserInstanceService: (userRequest: IUserRequest, role: Role) => Promise<User>
  createUserService: (user: User) => Promise<User>
  getUserbyIdService: (id: number) => Promise<User | null>
  updateUserByIdService: (id: number, user: QueryDeepPartialEntity<User>) => Promise<void>
  getAllUsersService: () => Promise<User[]>
}
