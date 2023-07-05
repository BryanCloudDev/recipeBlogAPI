import express, { Router } from 'express'
import { makeDBConnection } from '../database'
import 'dotenv/config'
import cors from 'cors'

export default class Server {
  constructor(
    readonly _app = express(),
    readonly _apiRouter = Router(),
    readonly _port = Number(process.env.PORT),
    readonly _apiRoute = '/api'
  ) {
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
    this._app.use(this._apiRoute, this._apiRouter)
  }

  public listener(): void {
    this._app.listen(this._port, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${this._port}`
      )
    })
  }
}
