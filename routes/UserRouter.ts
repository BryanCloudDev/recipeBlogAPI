import { UserController } from '../controllers'
import RouterBase from './RouterBase'

export default class UserRouter extends RouterBase {
  constructor(
    private readonly _userController = new UserController(),
    public readonly _userRoute = '/user'
  ) {
    super()
    this.post('/', this._userController.createUser)
  }
}
