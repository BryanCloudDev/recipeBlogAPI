import cors from 'cors'
import express, { type Application, type Router } from 'express'
import { type IUserRouter } from '../dto'
import { makeDBConnection } from '../database'
import { appFactory, portFactory, routeFactory } from '../services'
import { UserRouter } from '../routes'

export default class Server {
  private readonly _app: Application
  private readonly _port: number
  private readonly _router: Router
  private readonly route = '/api'

  constructor(
    readonly userRouter: IUserRouter = new UserRouter(),
    readonly App: () => Application = appFactory,
    readonly Port: () => number = portFactory,
    readonly Router: () => Router = routeFactory
  ) {
    void this.connectToDB()
    this._app = App()
    this.middleware()
    this._router = Router()
    this.routes()
    this._port = Port()
  }

  async connectToDB(): Promise<void> {
    await makeDBConnection()
  }

  private middleware(): void {
    // JSON PARSER

    this._app.use(express.json())

    this._app.use(cors())
  }

  private routes(): void {
    // App routers
    this._router.use(this.userRouter.route, this.userRouter.router)

    // API router
    this._app.use(this.route, this._router)
  }

  public listener(): void {
    this._app.listen(this._port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${this._port}`)
    })
  }
}
