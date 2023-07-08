import bcrypt from 'bcryptjs'
import { type IAuthenticationService } from '../dto'

export default class AuthenticationService implements IAuthenticationService {
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
