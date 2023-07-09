import { type IUserController, type IUserService, type ICustomRequest, type IUserRequest } from '../dto'
import { type Response, type Request } from 'express'
import { type User } from '../models'
import { LoggerService, Status, UserService } from '../services'

export class UserController implements IUserController {
  constructor(readonly userService: IUserService = new UserService()) {}

  createUser = async (req: ICustomRequest, res: Response): Promise<Response> => {
    try {
      const { ...userRequest }: IUserRequest = req.body

      const role = req.role

      const userInstance = await this.userService.createUserInstanceService(userRequest, role)
      await this.userService.createUserService(userInstance)

      return res.status(201).json({
        message: 'Successfully created'
      })
    } catch (error: any) {
      const { message } = LoggerService.errorMessageHandler(error, 'Error in create user controller')
      return res.status(500).json({ message })
    }
  }

  deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id)

      await this.userService.updateUserByIdService(id, { status: Status.INACTIVE })

      return res.status(204).json({})
    } catch (error: any) {
      const { message } = LoggerService.errorMessageHandler(error, 'Error in delete user by id controller')
      return res.status(500).json({ message })
    }
  }

  getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await this.userService.getAllUsersService()
      return res.status(200).json(users)
    } catch (error: any) {
      const { message } = LoggerService.errorMessageHandler(error, 'Error in get all users controller')
      return res.status(500).json({ message })
    }
  }

  getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id)
      const user = await this.userService.getUserbyIdService(id)

      return res.status(200).json(user)
    } catch (error: any) {
      const { message } = LoggerService.errorMessageHandler(error, 'Error in get user by id controller')
      return res.status(500).json({ message })
    }
  }

  getUserProfile = async (req: ICustomRequest, res: Response): Promise<Response> => {
    try {
      const { role, ...user }: User = req.user
      const { id } = role

      return res.status(200).json({
        ...user,
        roleId: id
      })
    } catch (error: any) {
      const { message } = LoggerService.errorMessageHandler(error, 'Error in get user profile controller')
      return res.status(500).json({ message })
    }
  }
}
