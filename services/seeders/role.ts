import { RoleService } from '../RoleService'

const roleService = new RoleService()

const createInitialRoles = async (initialRoles: string[]): Promise<void> => {
  for (const name of initialRoles) {
    const role = roleService.createRoleInstanceService({ name })
    await roleService.createRoleService(role)
  }
}

export { createInitialRoles }
