import { type Router } from 'express'

export default interface IRouterBase {
  initializeRoutes: () => void
  route: string
  router: Router
}
