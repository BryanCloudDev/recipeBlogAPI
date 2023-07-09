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
}
