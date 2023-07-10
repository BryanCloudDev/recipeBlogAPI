import type passport from 'passport'

export interface IPassportService {
  localStrategy: () => void
  jwtStrategy: () => void
  passport: passport.PassportStatic
}
