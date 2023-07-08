export default interface IServer {
  readonly route: string

  connectToDB: () => Promise<void>
  middleware: () => void
  routes: () => void
  listener: () => void
}
