import { injectable } from 'inversify'
import type IAuthenticateService from '../dto/auth/IAuthenticateService'
import bcrypt from 'bcryptjs'

@injectable()
export default class AuthenticationService implements IAuthenticateService {
  encrypt = async (text: string): Promise<string> => {
    try {
      const salt = await bcrypt.genSalt()
      const password = await bcrypt.hash(text, salt)
      return password
    } catch (error: any) {
      throw new Error('Error in password encryption')
    }
  }
}
