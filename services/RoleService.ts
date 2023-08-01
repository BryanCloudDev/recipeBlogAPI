import { type IRoleRepository, type IRoleService } from '../dto'
import { type Role } from '../models'
import { LoggerService } from './LoggerService'
import { RoleRepository } from '../repositories'

export class RoleService implements IRoleService {
  constructor(private readonly repository: IRoleRepository = new RoleRepository()) {}

  public getRoleByIdService = async (id: number): Promise<Role | null> => {
    try {
      const role = await this.repository.role.findOne({ where: { id } })
      return role
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in get role by id service').message)
    }
  }
}
