import { faker } from '@faker-js/faker'
import moment from 'moment'
import { type User, type Role } from '../../models'
import { UserService } from '../UserService'
import { RoleService } from '../RoleService'
import { Roles } from '../enums/Roles'

const userService = new UserService()
const roleService = new RoleService()

const createDummyUser = async (role: Role): Promise<User> => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const password = faker.internet.password()
  let email: string
  const birthDate = moment(faker.date.birthdate()).toDate()

  let emailNotUsed = false

  do {
    email = faker.internet.email()

    const foundEmail = await userService.getUserByEmail(email)
    if (foundEmail === null) {
      emailNotUsed = true
    }
  } while (!emailNotUsed)

  const userInstance = await userService.createUserInstanceService(
    {
      birthDate,
      email,
      firstName,
      lastName,
      password
    },
    role
  )

  return userInstance
}

const createMultipleDummyUsers = async (count: number, roleId: number): Promise<undefined> => {
  const role = await roleService.getRoleByIdService(roleId)

  if (role === null) {
    return
  }

  const userPromises: Array<Promise<number>> = []

  for (let i = 0; i < count; i++) {
    const user = await createDummyUser(role)
    userPromises.push(userService.createUserService(user))
  }

  await Promise.all(userPromises)
  await createInitialAdminUser()
}

const createInitialAdminUser = async (): Promise<undefined> => {
  const role = await roleService.getRoleByIdService(Roles.ADMIN)

  if (role === null) {
    return
  }

  const userInstance = await userService.createUserInstanceService(
    {
      birthDate: moment().toDate(),
      email: 'admin@example.com',
      firstName: 'User',
      lastName: 'Admin',
      password: 'secretpassword'
    },
    role
  )

  await userService.createUserService(userInstance)
}

export { createMultipleDummyUsers, createInitialAdminUser }
