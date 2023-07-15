import { type Repository } from 'typeorm'
import { type Role } from '../../models'

export interface IRoleRepository {
  role: Repository<Role>
}
