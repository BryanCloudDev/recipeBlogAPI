import { type Application, type Router } from 'express'
import { type IUserService, type IAuthenticationService, type IUserController, type IUserRouter } from '../../dto'
import { Container } from 'inversify'
import { UserController } from '../../controllers'
import { UserRouter } from '../../routes'
import { appFactory, portFactory, routeFactory } from '../utils'
import AuthenticationService from '../AuthenticationService'
import UserService from '../UserService'
import types from './types'

const container = new Container()

container.bind<IUserService>(types.IUserService).to(UserService)
container.bind<IAuthenticationService>(types.IAuthenticationService).to(AuthenticationService)
container.bind<IUserController>(types.IUserController).to(UserController)
container.bind<IUserRouter>(types.IUserRouter).to(UserRouter)
container.bind<() => Application>(types.AppFactory).toConstantValue(appFactory)
container.bind<() => number>(types.PortFactory).toConstantValue(portFactory)
container.bind<() => Router>(types.RouteFactory).toConstantValue(routeFactory)

export default container
