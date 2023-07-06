import bcrypt from 'bcryptjs'

export default class AuthenticationService {
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
