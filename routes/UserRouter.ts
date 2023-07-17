import moment from 'moment'
import { type Router } from 'express'
import { body, param } from 'express-validator'
import { type IUserMiddleWare, type IUserController, type IUserRouter } from '../dto'
import { Roles, routeFactory } from '../services'
import { UserController } from '../controllers'
import { UserMiddleWare, validateFields, validateStatus } from '../middlewares'

export class UserRouter implements IUserRouter {
  readonly _router: Router
  readonly route = '/users'
  readonly userValidations = [
    body('email', 'The email is not valid').isEmail().trim(),
    body('firstName', 'The first name is mandatory').notEmpty().isString().isLength({ max: 30 }).trim(),
    body('lastName', 'The last name is mandatory').notEmpty().isString().isLength({ max: 30 }).trim(),
    body('password', 'The password is mandatory and must have at least 6 characters').isLength({ min: 6 }).trim(),
    body('birthDate', 'The birthdate is mandatory and must be a valid date')
      .notEmpty()
      .isISO8601()
      .isBefore(moment().toISOString()),
    body('photo', 'Photo must be a valid base64 value').optional().notEmpty().isString().trim(),
    validateFields,
    this.userMiddleware.emailExists,
    this.userMiddleware.validateFile,
    this.userMiddleware.roleMiddleWare.validateRoleId
  ]

  constructor(
    readonly userController: IUserController = new UserController(),
    readonly userMiddleware: IUserMiddleWare = new UserMiddleWare(),
    readonly Router: () => Router = routeFactory
  ) {
    this._router = Router()
    this.initializeRoutes()
  }

  initializeRoutes(): void {
    this.createAdminUser()
    this.createUser()
    this.deleteUser()
    this.getAllUsers()
    this.getUserProfile()
    this.getUserById()
    this.updateUserPassword()
    this.updateUserById()
  }

  createAdminUser(): void {
    this._router.post(
      '/admin',
      [
        this.userMiddleware.authenticationMiddleware.validateJWT,
        this.userMiddleware.validateRole([Roles.ADMIN]),
        body('roleId').isNumeric(),
        ...this.userValidations
      ],
      this.userController.createUser
    )
  }

  createUser(): void {
    this._router.post(
      '/',
      [body('roleId').custom(this.userMiddleware.checkIfRoleIsSent), ...this.userValidations],
      this.userController.createUser
    )
  }

  deleteUser(): void {
    this._router.delete(
      '/:id',
      [
        this.userMiddleware.authenticationMiddleware.validateJWT,
        this.userMiddleware.validateRole([Roles.ADMIN]),
        param('id', 'User id must be an integer').isNumeric(),
        validateFields,
        this.userMiddleware.validateUserId,
        this.userMiddleware.validateUserOnDelete
      ],
      this.userController.deleteUser
    )
  }

  getAllUsers(): void {
    this._router.get(
      '/',
      [this.userMiddleware.authenticationMiddleware.validateJWT, this.userMiddleware.validateRole([Roles.ADMIN])],
      this.userController.getAllUsers
    )
  }

  getUserById(): void {
    this._router.get(
      '/:id',
      [
        this.userMiddleware.authenticationMiddleware.validateJWT,
        this.userMiddleware.validateRole([Roles.ADMIN]),
        param('id', 'User id must be an integer').isNumeric(),
        validateFields,
        this.userMiddleware.validateUserId
      ],
      this.userController.getUserById
    )
  }

  getUserProfile(): void {
    this._router.get(
      '/profile',
      [
        this.userMiddleware.authenticationMiddleware.validateJWT,
        this.userMiddleware.validateRole([Roles.ADMIN, Roles.USER])
      ],
      this.userController.getUserProfile
    )
  }

  updateUserById(): void {
    this._router.patch(
      '/:id',
      [
        this.userMiddleware.authenticationMiddleware.validateJWT,
        this.userMiddleware.validateRole([Roles.ADMIN]),
        param('id', 'User id must be an integer').isNumeric(),
        body('email', 'The email is not valid').optional().isEmail().trim(),
        body('firstName', 'The first name is mandatory').optional().notEmpty().isString().isLength({ max: 30 }).trim(),
        body('lastName', 'The last name is mandatory').optional().notEmpty().isString().isLength({ max: 30 }).trim(),
        body('password', 'The password is mandatory and must have at least 6 characters')
          .optional()
          .isLength({ min: 6 })
          .trim(),
        body('birthDate', 'The birthdate is mandatory and must be a valid date')
          .optional()
          .notEmpty()
          .isISO8601()
          .isBefore(moment().toISOString()),
        body('photo', 'The photo must be a valid base64 string').optional().notEmpty().isString().trim(),
        body('roleId').optional().isNumeric(),
        validateFields,
        this.userMiddleware.validateFile,
        this.userMiddleware.validateUserId,
        this.userMiddleware.validateEmailInChange,
        this.userMiddleware.roleMiddleWare.validateRoleId,
        validateStatus
      ],
      this.userController.updateUserbyId
    )
  }

  updateUserPassword(): void {
    this._router.patch(
      '/password-update',
      [
        this.userMiddleware.authenticationMiddleware.validateJWT,
        this.userMiddleware.validateRole([Roles.ADMIN, Roles.USER]),
        body('currentPassword', 'The password is mandatory and must have at least 6 characters').trim(),
        body('newPassword', 'The password is mandatory and must have at least 6 characters')
          .isLength({ min: 6 })
          .trim(),
        validateFields
      ],
      this.userController.updateUserPassword
    )
  }

  public get router(): Router {
    return this._router
  }
}
