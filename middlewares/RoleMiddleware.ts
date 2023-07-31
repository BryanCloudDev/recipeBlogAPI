import { type IRoleService, type ICustomRequest, type IRoleMiddleWare } from '../dto'
import { type Response, type NextFunction } from 'express'
import { LoggerService, RoleService, Roles, Status } from '../services'
import { type User } from '../models'

export class RoleMiddleWare implements IRoleMiddleWare {
  constructor(private readonly roleService: IRoleService = new RoleService()) {}

  validateRoleId = async (
    req: ICustomRequest<User>,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const roleSent: number = req.body.roleId ?? req.params.id
      const id = roleSent ?? Roles.USER

      const role = await this.roleService.getRoleByIdService(id)

      if (role === null) {
        return res.status(404).json({
          message: `The role with id ${id} is not registered in DB`
        })
      }

      if (role.status === Status.INACTIVE) {
        return res.status(400).json({
          message: 'The role has been marked already as inactive'
        })
      }

      req.role = role

      next()
    } catch (error: any) {
      next()
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in validate role id middleware').message)
    }
  }
}
