import RouterBase from './RouterBase'
import type IUserController from '../dto/user/IUserController'
import { Router } from 'express'
import { UserController } from '../controllers'

export default class UserRouter extends RouterBase {
  constructor(readonly userController: IUserController = new UserController()) {
    super(Router(), '/user')
    this.post('/', this.userController.createUser)
  }
}
