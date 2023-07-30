import express, { type Application, Router } from 'express'
import { dirname } from 'path'

export const appFactory = (): Application => {
  return express()
}

export const portFactory = (): number => {
  return Number(process.env.PORT)
}

export const routeFactory = (): Router => {
  return Router()
}

export const __filename = (file = '../index.js'): string => {
  return require.resolve(file)
}

export const __dirname = dirname(__filename())
