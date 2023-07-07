export default interface IAuthenticateService {
  encrypt: (text: string) => Promise<string>
}
