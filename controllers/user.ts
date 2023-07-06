import { type Response } from 'express'
import { type ICustomRequest, type IUserRequest } from '../dto'
import { createUserInstanceService, createUserService } from '../services'

const createUser = async (
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

export { createUser }
