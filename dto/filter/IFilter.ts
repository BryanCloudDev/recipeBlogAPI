import {
  type FindOptionsOrder,
  type FindOptionsSelect,
  type FindOptionsWhere,
  type FindOptionsRelations
} from 'typeorm'

export interface IFilter<T> {
  limit: number
  offset: number
  order: FindOptionsOrder<T> | undefined
  select: FindOptionsSelect<T>
  where: FindOptionsWhere<T> | Array<FindOptionsWhere<T>> | undefined
  relations: FindOptionsRelations<T>
}
