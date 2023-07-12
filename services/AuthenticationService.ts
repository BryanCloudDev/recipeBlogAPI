import bcrypt from 'bcryptjs'
import { type IAuthenticationService } from '../dto'
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
}
