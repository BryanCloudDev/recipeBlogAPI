import { type IAuthenticationMiddleWare, type IPassportService } from '../dto'
import { type Request, type Response, type NextFunction } from 'express'
import { type User } from '../models'
import { PassportService, Status, LoggerService, type Roles } from '../services'

export class AuthenticationMiddleWare implements IAuthenticationMiddleWare {
  constructor(readonly passportService: IPassportService = new PassportService()) {}

  validateJWT = (req: Request, res: Response, next: NextFunction): void => {
    this.passportService.passport.authenticate('jwt', async (err: Error | null, user: User | false, info: any) => {
      try {
        if (err !== null || user === false) {
          return res.status(400).json({
            message: info.message
          })
        }

        if (user.status === Status.INACTIVE) {
          return res.status(403).json({
            message: 'User has been deleted'
          })
        }

        if (user.status === Status.BANNED) {
          return res.status(403).json({
            message: 'User has been banned'
          })
        }

        req.login(user, { session: false }, async (err: any) => {
          if (err !== undefined) {
            next(err)
          }

          next()
        })
      } catch (error) {
        next(error)
        return res.status(500).json(LoggerService.errorMessageHandler(error, 'Error in jwt verification'))
      }
    })(req, res, next)
  }

  validateRole = (roles: Roles[]) => {
    return (req: Request, res: Response, next: NextFunction): Response | undefined => {
      const { role } = req.user as User
      const { id } = role

      if (!roles.includes(id)) {
        return res.status(403).json({
          message: 'You are not authorized'
        })
      }

      next()
    }
  }
}
