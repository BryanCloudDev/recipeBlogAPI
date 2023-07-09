import winston from 'winston'

export class LoggerService {
  private readonly loggerHandler = (): winston.Logger => {
    return winston.createLogger({
      level: 'error',
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console({ level: 'error' })
      ]
    })
  }

  public makeLog = (message: { error: string; location: string }): void => {
    const logger = this.loggerHandler()
    logger.error(message)
  }

  static errorMessageHandler = (error: any, location: string): { message: string } => {
    const logger = new LoggerService()
    logger.makeLog({
      error: error.message,
      location
    })

    const message = location

    return { message }
  }
}
