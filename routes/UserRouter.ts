import moment from 'moment'
import { type Router } from 'express'
import { body, checkExact, param } from 'express-validator'
import { type IUserMiddleWare, type IUserController, type IUserRouter } from '../dto'
import { Roles, routeFactory } from '../services'
import { UserController } from '../controllers'
import { UserMiddleWare, validateFields, validateFile, validateStatus } from '../middlewares'

export class UserRouter implements IUserRouter {
  public readonly _router: Router
  public readonly route = '/users'
  private readonly userValidations = [
    body('email', 'The email is not valid').isEmail().trim(),
    body('firstName', 'The first name is mandatory').notEmpty().isString().isLength({ max: 30 }).trim(),
    body('lastName', 'The last name is mandatory').notEmpty().isString().isLength({ max: 30 }).trim(),
    body('birthDate', 'The birthdate is mandatory and must be a valid date')
      .notEmpty()
      .isISO8601()
      .isBefore(moment().toISOString()),
    body('photo', 'Photo must be a valid base64 value').optional().notEmpty().isString().trim()
  ]

  private readonly userValidationsCreate = [
    ...this.userValidations,
    body('password', 'The password is mandatory and must have at least 6 characters').isLength({ min: 6 }).trim()
  ]

  constructor(
    private readonly userController: IUserController = new UserController(),
    private readonly userMiddleware: IUserMiddleWare = new UserMiddleWare(),
    private readonly Router: () => Router = routeFactory
  ) {
    this._router = Router()
    this.initializeRoutes()
  }

  public initializeRoutes(): void {
    this.createAdminUser()
    this.createUser()
    this.deleteUser()
    this.getAllUsers()
    this.getUserProfile()
    this.getUserById()
    this.updateUserPassword()
    this.updateUserById()
  }

  private createAdminUser(): void {
    this._router.post(
      '/admin',
      [
        this.userMiddleware.authenticationMiddleware.validateJWT,
        this.userMiddleware.authenticationMiddleware.validateRole([Roles.ADMIN]),
        checkExact([...this.userValidationsCreate, body('roleId').isNumeric()], {
          message: 'Too many fields specified'
        }),
        validateFields,
        this.userMiddleware.emailExists,
        this.userMiddleware.roleMiddleWare.validateRoleId,
        validateFile
      ],
      this.userController.createUser
    )
  }

  private createUser(): void {
    this._router.post(
      '/',
      [
        checkExact([...this.userValidationsCreate], {
          message: 'Too many fields specified'
        }),
        validateFields,
        this.userMiddleware.emailExists,
        this.userMiddleware.roleMiddleWare.validateRoleId,
        validateFile
      ],
      this.userController.createUser
    )
  }

  private deleteUser(): void {
    this._router.delete(
      '/:id',
      [
        this.userMiddleware.authenticationMiddleware.validateJWT,
        this.userMiddleware.authenticationMiddleware.validateRole([Roles.ADMIN]),
        param('id', 'User id must be an integer').isNumeric(),
        validateFields,
        this.userMiddleware.validateUserId,
        this.userMiddleware.validateUserOnDelete
      ],
      this.userController.deleteUser
    )
  }

  private getAllUsers(): void {
    this._router.get(
      '/',
      [
        this.userMiddleware.authenticationMiddleware.validateJWT,
        this.userMiddleware.authenticationMiddleware.validateRole([Roles.ADMIN])
      ],
      this.userController.getAllUsers
    )
  }

  private getUserById(): void {
    this._router.get(
      '/:id',
      [
        this.userMiddleware.authenticationMiddleware.validateJWT,
        this.userMiddleware.authenticationMiddleware.validateRole([Roles.ADMIN]),
        param('id', 'User id must be an integer').isNumeric(),
        validateFields,
        this.userMiddleware.validateUserId,
        this.userMiddleware.validateUserOnDelete
      ],
      this.userController.getUserById
    )
  }

  private getUserProfile(): void {
    this._router.get(
      '/profile',
      [
        this.userMiddleware.authenticationMiddleware.validateJWT,
        this.userMiddleware.authenticationMiddleware.validateRole([Roles.ADMIN, Roles.USER])
      ],
      this.userController.getUserProfile
    )
  }

  private updateUserById(): void {
    this._router.patch(
      '/:id',
      [
        this.userMiddleware.authenticationMiddleware.validateJWT,
        this.userMiddleware.authenticationMiddleware.validateRole([Roles.ADMIN]),
        param('id', 'User id must be an integer').isNumeric(),
        checkExact(
          [
            ...this.userValidations.map(validation => validation.optional()),
            body('roleId').optional().isNumeric(),
            body('status').optional().isNumeric()
          ],
          {
            message: 'Too many fields specified'
          }
        ),
        validateFields,
        this.userMiddleware.validateUserId,
        this.userMiddleware.validateEmailInChange,
        this.userMiddleware.roleMiddleWare.validateRoleId,
        validateFile,
        validateStatus
      ],
      this.userController.updateUserbyId
    )
  }

  private updateUserPassword(): void {
    this._router.patch(
      '/password-update',
      [
        this.userMiddleware.authenticationMiddleware.validateJWT,
        this.userMiddleware.authenticationMiddleware.validateRole([Roles.ADMIN, Roles.USER]),
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
