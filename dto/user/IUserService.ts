import { type IUserRequest } from './'
import { type Role, type User } from '../../models'

export interface IUserService {
  createUserInstanceService: (userRequest: IUserRequest, role: Role) => Promise<User>
  createUserService: (user: User) => Promise<User>
  getAllUsersService: () => Promise<User[]>
  getUserbyIdService: (id: number) => Promise<User | null>
  updateUserByIdService: (id: number, user: Partial<IUserRequest>) => Promise<void>
  updateUserPasswordService: (user: User, currentPassword: string, newPassword: string) => Promise<string | undefined>
  getUserByEmail: (email: string) => Promise<User | null>
}
