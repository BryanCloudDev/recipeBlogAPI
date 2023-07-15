import { type IUserMiddleWare, type IUserController, type IUserRouter, type IAuthenticationMiddleWare } from '../dto'
import { type Router } from 'express'
import { UserController } from '../controllers'
import { routeFactory } from '../services'
import { AuthenticationMiddleWare, UserMiddleWare } from '../middlewares'
import { body } from 'express-validator'

export class UserRouter implements IUserRouter {
  readonly _router: Router
  readonly route = '/users'

  constructor(
    readonly userController: IUserController = new UserController(),
    readonly authenticationMiddleware: IAuthenticationMiddleWare = new AuthenticationMiddleWare(),
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
    this._router.post(
      '/',
      [
        body('email', 'The email is not valid').isEmail().trim(),
        this.userMiddleware.emailExists,
        body('firstName', 'The first name is mandatory').not().isEmpty().isString().isLength({ max: 30 }).trim(),
        body('lastName', 'The last name is mandatory').not().isEmpty().isString().isLength({ max: 30 }).trim(),
        body('password', 'The password is mandatory and must have at least 6 characters').isLength({ min: 6 }).trim(),
        body('birthDate', 'The birthdate is mandatory').not().isEmpty().isISO8601(),
        body('photo', 'The photo must be a valid base64').optional().trim().isBase64()
      ],
      this.userController.createUser
    )
  }

  getAllUsers(): void {
    this._router.get('/', [this.authenticationMiddleware.validateJWT], this.userController.getAllUsers)
  }

  public get router(): Router {
    return this._router
  }
}
