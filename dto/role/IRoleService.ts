import { type Role } from '../../models'

export interface IRoleService {
  getRoleByIdService: (id: number) => Promise<Role | null>
}
