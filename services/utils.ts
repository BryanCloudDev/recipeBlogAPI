import express, { type Application, Router } from 'express'
import { dirname } from 'path'
import { Routes } from './enums/Routes'

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

export const buildURLForFile = (route: string, fileName: string): { url: string; path: string } => {
  return {
    url: `${process.env.BASE_URL as string}:${process.env.PORT as string}/${Routes.API}/${route}/photo/${
      Routes.RECIPES
    }/${fileName}`,
    path: `photo/${route}/${fileName}`
  }
}
