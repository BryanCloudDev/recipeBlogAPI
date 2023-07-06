import { type Request, type Response } from 'express'
import { type User } from '../models'
import { Status, type ICustomRequest, type IUserRequest } from '../dto'
import {
  createUserInstanceService,
  createUserService,
  getUserbyIdService
} from '../services'
import { userRepository } from '../repositories'

export default class UserController {
  createUser = async (
    req: ICustomRequest,
    res: Response
  ): Promise<Response> => {
    try {
      const { ...userRequest }: IUserRequest = req.body

      const role = req.role

      const userInstance = await createUserInstanceService(userRequest, role)
      await createUserService(userInstance)

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

      await userRepository.update(id, {
        status: Status.INACTIVE
      })

      return res.status(204).json({})
    } catch (error: any) {
      return res.status(500).json(error.message)
    }
  }

  getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await userRepository.find()
      return res.status(200).json(users)
    } catch (error: any) {
      return res.status(500).json(error.message)
    }
  }

  getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id)
      const user = await getUserbyIdService(id)

      return res.status(200).json(user)
    } catch (error: any) {
      return res.status(500).json(error.message)
    }
  }

  getUserProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { role, ...user }: User = req.user as User
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
