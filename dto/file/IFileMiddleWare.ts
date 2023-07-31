import { type RequestHandler } from 'express'

export interface IFileMiddleWare {
  userConfigMulter: RequestHandler
}
