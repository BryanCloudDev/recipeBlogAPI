import { type IRouterBase, IUserController } from '../dto'
import { type Router } from 'express'
import { injectable, inject } from 'inversify'
import { types } from '../services'

@injectable()
export default class UserRouter implements IRouterBase {
  readonly route = '/users'
  private readonly _router: Router

  constructor(
    @inject(types.IUserController)
    readonly userController: IUserController,
    @inject(types.RouteFactory)
    readonly routeFactory: () => Router
  ) {
    this._router = routeFactory()
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
