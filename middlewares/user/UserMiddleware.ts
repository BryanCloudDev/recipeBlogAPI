import { type IUserMiddleWare } from '../../dto'
import { type Request, type Response, type NextFunction } from 'express'
import { type User } from '../../models'
import { LoggerService, PassportService, Status } from '../../services'

export class UserMiddleWare implements IUserMiddleWare {
  constructor(readonly passportService = new PassportService()) {}

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
}
