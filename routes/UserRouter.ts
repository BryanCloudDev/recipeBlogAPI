import { UserController } from '../controllers'
import { routeFactory } from '../services'
import { type IUserController, type IUserRouter } from '../dto'
import { type Router } from 'express'

export default class UserRouter implements IUserRouter {
  readonly _router: Router
  readonly route = '/users'

  constructor(
    readonly userController: IUserController = new UserController(),
    readonly Router: () => Router = routeFactory
  ) {
    this._router = Router()
    this.initializeRoutes()
  }

  initializeRoutes(): void {
    this._router.post('/', this.userController.createUser)
    this._router.get('/', this.userController.getAllUsers)
  }

  public get router(): Router {
    return this._router
  }
}
