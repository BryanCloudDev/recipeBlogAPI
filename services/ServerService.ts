import express, { type Application, Router } from 'express'

const appFactory = (): Application => {
  return express()
}

const portFactory = (): number => {
  return Number(process.env.PORT)
}

const routeFactory = (): Router => {
  return Router()
}

export { appFactory, routeFactory, portFactory }
