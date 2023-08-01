import { type Repository } from 'typeorm'
import { type IFilter } from './IFilter'
import { type EntityType } from '../EntityType'

export interface IGetAllItems<T extends EntityType> {
  filter: IFilter<T> | undefined
  repository: Repository<T>
}

export interface IGetAllItemsResult<T> {
  items: T[]
  count: number
}
