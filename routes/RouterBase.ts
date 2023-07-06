import { Router } from 'express'

export default abstract class RouterBase {
  constructor(readonly router: Router = Router()) {}

  protected get(path: string, ...handler: any): Router {
    return this.router.get(path, ...handler)
  }

  protected post(path: string, ...handler: any): Router {
    return this.router.post(path, ...handler)
  }

  protected delete(path: string, ...handler: any): Router {
    return this.router.delete(path, ...handler)
  }

  protected patch(path: string, ...handler: any): Router {
    return this.router.patch(path, ...handler)
  }

  get getRouter(): Router {
    return this.router
  }
}
