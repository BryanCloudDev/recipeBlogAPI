import { type EntityTarget } from 'typeorm'
import { type Role } from '../models'
import RepositoryBase from './RepositoryBase'

export default class RoleRepository extends RepositoryBase<EntityTarget<Role>> {}
