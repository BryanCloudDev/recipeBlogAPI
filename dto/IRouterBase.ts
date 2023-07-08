import { type Router } from 'express'

export default interface IRouterBase {
  initializeRoutes: () => void
  _router: Router
  route: string
  router: Router
}
