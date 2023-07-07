import 'dotenv/config'
import { makeDBConnection } from '../database'
import cors from 'cors'
import express, { type Application, type Router } from 'express'
import { inject, injectable } from 'inversify'
import types from '../services/inversify/types'
import IUserRouter from '../dto/user/IUserRouter'

@injectable()
export default class Server {
  readonly _apiRoute = '/api'
  private readonly _app: Application
  private readonly _port: number
  private readonly _apiRouter: Router

  constructor(
    @inject(types.IUserRouter)
    readonly userRouter: IUserRouter,
    @inject(types.AppFactory)
    readonly appFactory: () => Application,
    @inject(types.PortFactory)
    readonly portFactory: () => number,
    @inject(types.RouteFactory)
    readonly routeFactory: () => Router
  ) {
    void this.connectToDB()
    this._app = appFactory()
    this._port = portFactory()
    this._apiRouter = routeFactory()
    this.middleware()
    this.routes()
  }

  private async connectToDB(): Promise<void> {
    await makeDBConnection()
  }

  private middleware(): void {
    // JSON PARSER

    this._app.use(express.json())

    this._app.use(cors())
  }

  private routes(): void {
    // App routers
    this._apiRouter.use(this.userRouter.route, this.userRouter.router)

    // API router
    this._app.use(this._apiRoute, this._apiRouter)
  }

  public listener(): void {
    this._app.listen(this._port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${this._port}`)
    })
  }
}
