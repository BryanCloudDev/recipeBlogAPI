import { type IRoleRepository } from '../dto'
import { type Repository } from 'typeorm'
import { type Role } from '../models'
import { roleRepository } from './repositories'

export class RoleRepository implements IRoleRepository {
  constructor(readonly role: Repository<Role> = roleRepository) {}
}
