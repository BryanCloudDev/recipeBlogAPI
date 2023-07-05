import { type IUserRequest } from '../../dto'
import { type Role, type User } from '../../models'
import { encrypt } from '../'
import { userRepository } from '../../repositories'

const createUserInstanceService = async (
  userRequest: IUserRequest,
  role: Role
): Promise<User> => {
  try {
    userRequest.password = await encrypt(userRequest.password)
    const user = userRepository.create({ ...userRequest, role })

    return user
  } catch (error) {
    throw new Error('Error in create user instance service')
  }
}

export { createUserInstanceService }
