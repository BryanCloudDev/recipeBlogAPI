import {
  type IUserController,
  type IUserService,
  type ICustomRequest,
  type IUserRequest,
  type IUserPasswordChange
} from '../dto'
import { type Response, type Request } from 'express'
import { type User } from '../models'
import { LoggerService, Routes, Status, UserService } from '../services'

export class UserController implements IUserController {
  constructor(readonly userService: IUserService = new UserService()) {}

  createUser = async (req: ICustomRequest, res: Response): Promise<Response> => {
    try {
      const { ...userRequest }: IUserRequest = req.body

      const role = req.role

      const userInstance = await this.userService.createUserInstanceService(userRequest, role)
      const id = await this.userService.createUserService(userInstance)

      return res.status(201).json({
        message: 'Successfully created',
        id
      })
    } catch (error: any) {
      const { message } = LoggerService.errorMessageHandler(error, 'Error in create user controller')
      return res.status(500).json({ message })
    }
  }

  deleteUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id, photo } = req.user as User

      await this.userService.updateUserByIdService(id, { status: Status.INACTIVE, photo: '' })
      this.userService.fileService.deleteExistingFile(photo)

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
      const { role, password, updatedOn, ...user }: User = req.user
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

  updateUserbyId = async (req: ICustomRequest, res: Response): Promise<Response> => {
    try {
      const { ...userRequest }: IUserRequest = req.body
      const { role, user } = req

      await this.userService.updateUserByIdService(user.id, userRequest, role)
      return res.status(204).json({})
    } catch (error: any) {
      const { message } = LoggerService.errorMessageHandler(error, 'Error in update user profile controller')
      return res.status(500).json({ message })
    }
  }

  updateUserPassword = async (req: ICustomRequest, res: Response): Promise<Response> => {
    try {
      const { currentPassword, newPassword }: IUserPasswordChange = req.body
      const user = req.user

      const result = await this.userService.updateUserPasswordService(user, currentPassword, newPassword)

      return result !== undefined ? res.status(400).json({ message: result }) : res.status(204).json({})
    } catch (error: any) {
      const { message } = LoggerService.errorMessageHandler(error, 'Error in update user profile controller')
      return res.status(500).json({ message })
    }
  }

  public uploadPhoto = async (req: ICustomRequest, res: Response): Promise<Response> => {
    try {
      if (req.file !== undefined) {
        const { id, photo } = req.user
        const { filename } = req.file
        this.userService.fileService.deleteExistingFile(photo)

        const { path, url } = this.userService.fileService.buildURLForFile(Routes.USERS, filename)

        await this.userService.updateUserByIdService(id, { photo: path })

        return res.status(200).json({
          message: 'Succesfully uploaded',
          url
        })
      }

      return res.status(500).json({
        message: 'Error when uploading photo'
      })
    } catch (error) {
      const { message } = LoggerService.errorMessageHandler(error, 'Error in update photo user by id controller')

      return res.status(500).json({ message })
    }
  }
}
