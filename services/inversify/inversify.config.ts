import { Container } from 'inversify'
import type IUserService from '../../dto/user/IUserService'
import types from './types'
import UserService from '../UserService'
import type IAuthenticationService from '../../dto/auth/IAuthenticationService'
import AuthenticationService from '../AuthenticationService'
import { UserController } from '../../controllers'
import type IUserController from '../../dto/user/IUserController'
import UserRouter from '../../routes/UserRouter'
import type IUserRouter from '../../dto/user/IUserRouter'
import { appFactory, portFactory, routeFactory } from '../ServerService'
import { type Application, type Router } from 'express'

const container = new Container()

container.bind<IUserService>(types.IUserService).to(UserService)
container.bind<IAuthenticationService>(types.IAuthenticationService).to(AuthenticationService)
container.bind<IUserController>(types.IUserController).to(UserController)
container.bind<IUserRouter>(types.IUserRouter).to(UserRouter)
container.bind<() => Application>(types.AppFactory).toConstantValue(appFactory)
container.bind<() => number>(types.PortFactory).toConstantValue(portFactory)
container.bind<() => Router>(types.RouteFactory).toConstantValue(routeFactory)

export default container
