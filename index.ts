import Server from './server'
import container from './services/inversify/inversify.config'

const server = container.resolve<Server>(Server)

server.listener()
