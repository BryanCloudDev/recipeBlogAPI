export interface IAuthenticationService {
  encrypt: (text: string) => Promise<string>
}
