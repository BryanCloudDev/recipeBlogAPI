import 'reflect-metadata'
import 'dotenv/config'
import Server from './server'
import { container } from './services'

const server = container.resolve<Server>(Server)

server.listener()
