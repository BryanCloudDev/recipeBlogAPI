import express, { type Application, Router } from 'express'

export const appFactory = (): Application => {
  return express()
}

export const portFactory = (): number => {
  return Number(process.env.PORT)
}

export const routeFactory = (): Router => {
  return Router()
}
