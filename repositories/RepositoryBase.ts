import { type Repository, type EntityTarget, type ObjectLiteral } from 'typeorm'
import { AppDataSource } from '../database'

export default abstract class RepositoryBase<T extends EntityTarget<ObjectLiteral>> {}
