import { type IUserMiddleWare, type IUserController, type IUserRouter } from '../dto'
import { type Router } from 'express'
import { UserController } from '../controllers'
import { routeFactory } from '../services'
import { UserMiddleWare } from '../middlewares'

export class UserRouter implements IUserRouter {
  readonly _router: Router
  readonly route = '/users'

  constructor(
    readonly userController: IUserController = new UserController(),
    readonly userMiddleware: IUserMiddleWare = new UserMiddleWare(),
    readonly Router: () => Router = routeFactory
  ) {
    this._router = Router()
    this.initializeRoutes()
  }

  initializeRoutes(): void {
    this.createUser()
    this.getAllUsers()
  }

  createUser(): void {
    this._router.post('/', this.userController.createUser)
  }

  getAllUsers(): void {
    this._router.get('/', [this.userMiddleware.validateJWT], this.userController.getAllUsers)
  }

  public get router(): Router {
    return this._router
  }
}
