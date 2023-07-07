import { type Router } from 'express'
import type IRouterBase from '../dto/IRouterBase'

export default class RouterBase implements IRouterBase {
  constructor(
    readonly router: Router,
    readonly route: string
  ) {}

  get(path: string, ...handler: any): Router {
    return this.router.get(path, ...handler)
  }

  post(path: string, ...handler: any): Router {
    return this.router.post(path, ...handler)
  }

  delete(path: string, ...handler: any): Router {
    return this.router.delete(path, ...handler)
  }

  patch(path: string, ...handler: any): Router {
    return this.router.patch(path, ...handler)
  }

  get getRouter(): Router {
    return this.router
  }
}
