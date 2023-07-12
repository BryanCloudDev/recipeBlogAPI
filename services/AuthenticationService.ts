import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { type IAuthenticationService, type IJwtPayload } from '../dto'
import { LoggerService } from './'

export class AuthenticationService implements IAuthenticationService {
  encrypt = async (text: string): Promise<string> => {
    try {
      const salt = await bcrypt.genSalt()
      const password = await bcrypt.hash(text, salt)
      return password
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in password encryption').message)
    }
  }

  checkPassword = async (password: string, hash: string): Promise<boolean> => {
    try {
      const isCorrect = await bcrypt.compare(password, hash)
      return isCorrect
    } catch (error: any) {
      throw new Error(LoggerService.errorMessageHandler(error, 'Error in password verification').message)
    }
  }

  generateJWT = (data: IJwtPayload): any => {
    return new Promise((resolve, reject) => {
      const payload = {
        ...data
      }

      jwt.sign(payload, String(process.env.JWT_KEY), { expiresIn: '1h' }, (err: Error, token: string) => {
        if (err !== null) {
          LoggerService.errorMessageHandler(err, 'Error in JWT generation')
          reject(new Error('JWT could not be generated'))
        }
        resolve(token)
      })
    })
  }
}
