import { type Router } from 'express'

export default interface IRouterBase {
  delete: (path: string, ...handler: any) => Router
  get: (path: string, ...handler: any) => Router
  getRouter: Router
  patch: (path: string, ...handler: any) => Router
  post: (path: string, ...handler: any) => Router
  route: string
}
