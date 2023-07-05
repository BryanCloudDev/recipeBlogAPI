import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  database: process.env.DATABASE_NAME,
  entities: [],
  host: process.env.DATABASE_HOST,
  logging: false,
  migrations: [],
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT),
  subscribers: [],
  synchronize: true,
  type: 'mysql',
  username: process.env.DATABASE_USER
})

export async function makeDBConnection(): Promise<void> {
  try {
    await AppDataSource.initialize()
    console.log('Successfully connected to Database')
  } catch (error: any) {
    console.log(error.message)
  }
}
