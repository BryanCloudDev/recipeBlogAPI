import IUserController from '../dto/user/IUserController'
import { inject, injectable } from 'inversify'
import types from '../services/inversify/types'
import { type Router } from 'express'
import type IRouterBase from '../dto/IRouterBase'

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
