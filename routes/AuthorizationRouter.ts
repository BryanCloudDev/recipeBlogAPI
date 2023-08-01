import { type IAuthorizationRouter, type IAuthorizationController } from '../dto'
import { type Router } from 'express'
import { AuthorizationController } from '../controllers'
import { Routes, routeFactory } from '../services'

export class AuthorizationRouter implements IAuthorizationRouter {
  readonly _router: Router
  readonly route = `/${Routes.LOGIN}`

  constructor(
    readonly authorizationController: IAuthorizationController = new AuthorizationController(),
    readonly Router: () => Router = routeFactory
  ) {
    this._router = Router()
    this.initializeRoutes()
  }

  initializeRoutes(): void {
    this.login()
  }

  private login(): void {
    this._router.post('/', this.authorizationController.login)
  }

  public get router(): Router {
    return this._router
  }
}
