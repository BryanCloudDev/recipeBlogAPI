import moment from 'moment'
import passport from 'passport'
import { AuthenticationService } from './AuthenticationService'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'
import { type IUserRepository, type IAuthenticationService, type IPassportService } from '../dto'
import { LoggerService } from '.'
import { UserRepository } from '../repositories'

export class PassportService implements IPassportService {
  constructor(
    readonly passportCustom: passport.PassportStatic = passport,
    readonly authenticationService: IAuthenticationService = new AuthenticationService(),
    readonly repository: IUserRepository = new UserRepository()
  ) {}

  localStrategy = (): void => {
    this.passportCustom.use(
      new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password'
        },
        async (email: string, password: string, done: any) => {
          try {
            const user = await this.repository.user.findOne({ where: { email }, relations: { role: true } })

            if (user === null) {
              return done(null, false, {
                message: 'Email or passowrd incorrect'
              })
            }

            const isPasswordCorrect = await this.authenticationService.checkPassword(password, user.password)

            if (!isPasswordCorrect) {
              return done(null, false, {
                message: 'Email or passowrd incorrect'
              })
            }

            await this.repository.user.update(user.id, {
              lastLogin: moment().toISOString()
            })

            return done(null, user)
          } catch (error: any) {
            LoggerService.errorMessageHandler(error, 'Error in passport local')

            done(null, false, {
              message: 'Email or passowrd incorrect'
            })
          }
        }
      )
    )
  }

  jwtStrategy = (): void => {
    this.passportCustom.use(
      new JWTStrategy(
        {
          secretOrKey: process.env.JWT_KEY,
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async (token: any, done: any) => {
          try {
            const user = await this.repository.user.findOne({ where: { id: token.id }, relations: { role: true } })

            if (user === null) {
              return done(null, false, {
                message: 'JWT is invalid'
              })
            }

            done(null, user)
          } catch (error: any) {
            LoggerService.errorMessageHandler(error, 'Error in passport jwt')

            return done(null, false, {
              message: 'JWT is invalid'
            })
          }
        }
      )
    )
  }

  get passport(): passport.PassportStatic {
    this.localStrategy()
    this.jwtStrategy()
    return this.passportCustom
  }
}
