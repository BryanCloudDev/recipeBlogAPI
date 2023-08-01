import express, { type Application, Router } from 'express'
import { dirname } from 'path'
import { type IGetAllItems, type EntityType, type IGetAllItemsResult } from '../dto'

export const appFactory = (): Application => {
  return express()
}

export const portFactory = (): number => {
  return Number(process.env.PORT)
}

export const routeFactory = (): Router => {
  return Router()
}

export const __filename = (file = '../index.js'): string => {
  return require.resolve(file)
}

export const __dirname = dirname(__filename())

export const getAllItems = async <T extends EntityType>({
  filter,
  repository
}: IGetAllItems<T>): Promise<IGetAllItemsResult<T>> => {
  const entityPromise = repository.find(
    filter !== undefined
      ? {
          where: filter.where,
          skip: filter.offset,
          take: filter.limit,
          select: filter.select,
          order: filter.order,
          relations: filter.relations
        }
      : {}
  )
  const countPromise = repository.count(filter !== undefined ? { where: filter.where } : {})

  const [items, count] = await Promise.all([entityPromise, countPromise])

  return { items, count }
}
