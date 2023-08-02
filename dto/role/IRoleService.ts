import { type Role } from '../../models'
import { type IRoleRequest } from '../IRoleRequest'

export interface IRoleService {
  createRoleInstanceService: (roleRequest: IRoleRequest) => Role
  createRoleService: (role: Role) => Promise<Role>
  getRoleByIdService: (id: number) => Promise<Role | null>
}
