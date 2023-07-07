import { type IUserController, IUserService, type ICustomRequest, type IUserRequest } from '../dto'
import { type Response, type Request } from 'express'
import { type User } from '../models'
import { Status, types } from '../services'
import { injectable, inject } from 'inversify'

@injectable()
export default class UserController implements IUserController {
  constructor(
    @inject(types.IUserService)
    readonly userService: IUserService
  ) {}

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
      return res.status(500).json(error.message)
    }
  }

  deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id)

      await this.userService.updateUserByIdService(id, { status: Status.INACTIVE })

      return res.status(204).json({})
    } catch (error: any) {
      return res.status(500).json(error.message)
    }
  }

  getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await this.userService.getAllUsers()
      return res.status(200).json(users)
    } catch (error: any) {
      return res.status(500).json(error.message)
    }
  }

  getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id)
      const user = await this.userService.getUserbyIdService(id)

      return res.status(200).json(user)
    } catch (error: any) {
      return res.status(500).json(error.message)
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
      return res.status(500).json(error.message)
    }
  }
}
