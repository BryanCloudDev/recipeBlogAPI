import express from 'express'
import { makeDBConnection } from '../database'
import 'dotenv/config'
import cors from 'cors'
import RouterBase from '../routes/RouterBase'
import UserRouter from '../routes/UserRouter'

export default class Server extends RouterBase {
  readonly userRouter: UserRouter

  constructor(
    readonly _app = express(),
    readonly _port = Number(process.env.PORT),
    readonly _apiRoute = '/api'
  ) {
    super()
    this.userRouter = new UserRouter()
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
    // API route
    this.getRouter.use(this.userRouter._userRoute, this.userRouter.getRouter)

    this._app.use(this._apiRoute, this.getRouter)
  }

  public listener(): void {
    this._app.listen(this._port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${this._port}`)
    })
  }
}
