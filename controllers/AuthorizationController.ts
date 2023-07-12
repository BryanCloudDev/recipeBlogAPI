import { type Request, type Response, type NextFunction } from 'express'
import { type IAuthorizationController, type IAuthenticationService, type IPassportService } from '../dto'
import { type User } from '../models'
import { AuthenticationService, LoggerService, PassportService, Status } from '../services'

export class AuthorizationController implements IAuthorizationController {
  constructor(
    private readonly authenticationService: IAuthenticationService = new AuthenticationService(),
    private readonly passportService: IPassportService = new PassportService()
  ) {}

  login = (req: Request, res: Response, next: NextFunction): void => {
    this.passportService.passport.authenticate('local', async (err: Error | null, user: User | false, info: any) => {
      try {
        if (err !== null || user === false) {
          return res.status(400).json(info)
        }

        const status = user.status

        if (status === Status.INACTIVE) {
          return res.status(403).json({
            message: 'Your account has been deleted'
          })
        }

        if (status === Status.BANNED) {
          return res.status(403).json({
            message: 'Your account has been banned'
          })
        }

        req.login(user, { session: false }, async (err: any) => {
          if (err !== undefined) {
            next(err)
            return
          }
          const { id, email, role } = user
          const { id: roleId } = role

          const token = await this.authenticationService.generateJWT({ id, email, role: roleId })
          return res.status(200).json({ token })
        })
      } catch (error: any) {
        next(error)
        return res.status(500).json(LoggerService.errorMessageHandler(error, 'Error in login'))
      }
    })(req, res, next)
  }
}
