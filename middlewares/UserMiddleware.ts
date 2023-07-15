import { type IUserRequest, type IUserMiddleWare, type IUserService, type ICustomRequest } from '../dto'
import { type Request, type Response, type NextFunction } from 'express'
import { LoggerService, Status, UserService } from '../services'

export class UserMiddleWare implements IUserMiddleWare {
  constructor(readonly userService: IUserService = new UserService()) {}

  validateEmailInChange = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const { email }: IUserRequest = req.body

      if (email === undefined) {
        next()
        return undefined
      }

      const id = parseInt(req.params.id)
      const user = await this.userService.getUserbyIdService(id)

      if (user !== null && user.email !== email) {
        const existingEmail = await this.userService.getUserByEmail(email)

        if (existingEmail !== null) {
          return res.status(400).json({
            message: `Email ${email} is already in use`
          })
        }
      }
      next()
    } catch (error: any) {
      return res.status(500).json(LoggerService.errorMessageHandler(error, 'Error in validate Email in change'))
    }
  }

  validateUserOnDelete = async (
    req: ICustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    const user = req.user

    if (user.status === Status.INACTIVE || user.status === Status.BANNED) {
      return res.status(400).json({
        message: `The user has been marked already as ${user.status === Status.INACTIVE ? 'inactive' : 'banned'}`
      })
    }

    next()
  }

  validateUserId = async (req: ICustomRequest, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const id = parseInt(req.params.id)

      const user = await this.userService.getUserbyIdService(id)

      if (user === null) {
        return res.status(404).json({
          message: `The user with the id ${id} does not exist`
        })
      }

      req.user = user

      next()
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in exists user by id middleware').message)
    }
  }

  emailExists = async (req: ICustomRequest, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const { email }: IUserRequest = req.body
      const user = await this.userService.getUserByEmail(email)
      if (user !== null) {
        return res.status(400).json({ message: `The email ${email} is already registered in DB` })
      }
      next()
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in exists user by email middleware').message)
    }
  }
}
