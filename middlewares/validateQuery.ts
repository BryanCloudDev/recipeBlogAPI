import { type Response, type NextFunction } from 'express'
import { type EntityType, type ICustomRequest, type IFilter } from '../dto'

const validateQuery = <T extends EntityType>(
  req: ICustomRequest<T>,
  res: Response,
  next: NextFunction
): Response | undefined => {
  try {
    const reqFilter = req.query.filter as string
    req.filter = undefined

    if (reqFilter !== undefined) {
      let { where, limit, offset, select, order, relations }: IFilter<T> = JSON.parse(reqFilter)

      if (isNaN(limit) || isNaN(offset)) {
        return res.status(400).json({
          message: 'In order to paginate you need to send at least limit and offset'
        })
      }

      if (where === undefined) {
        where = {}
      }

      if (select === undefined) {
        select = {}
      }

      if (order === undefined) {
        order = {}
      }

      if (relations === undefined) {
        relations = {}
      }

      req.filter = {
        limit,
        offset,
        where,
        select,
        order,
        relations
      }
    }

    next()
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    })
  }
}

export { validateQuery }
