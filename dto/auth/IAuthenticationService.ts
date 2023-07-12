import { type IJwtPayload } from './IJwtPayload'

export interface IAuthenticationService {
  encrypt: (text: string) => Promise<string>
  checkPassword: (password: string, hash: string) => Promise<boolean>
  generateJWT: (data: IJwtPayload) => any
}
