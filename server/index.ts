import 'dotenv/config'
import { makeDBConnection } from '../database'
import RouterBase from '../routes/RouterBase'
import cors from 'cors'
import express, { Router } from 'express'
import UserRouter from '../routes/UserRouter'

export default class Server extends RouterBase {
  constructor(
    readonly _app = express(),
    readonly _port = Number(process.env.PORT),
    readonly userRouter = new UserRouter()
  ) {
    super(Router(), '/api')
    void this.connectToDB()
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
    this.getRouter.use(this.userRouter.route, this.userRouter.getRouter)

    // API router
    this._app.use(this.route, this.getRouter)
  }

  public listener(): void {
    this._app.listen(this._port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${this._port}`)
    })
  }
}
