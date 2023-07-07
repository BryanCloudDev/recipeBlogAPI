export default interface IAuthenticationService {
  encrypt: (text: string) => Promise<string>
}
