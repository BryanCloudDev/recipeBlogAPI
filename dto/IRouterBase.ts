import { type Router } from 'express'

export interface IRouterBase {
  initializeRoutes: () => void
  _router: Router
  route: string
  router: Router
}
