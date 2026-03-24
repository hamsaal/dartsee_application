import dotenv from 'dotenv'

dotenv.config()

interface Config {
  port: number
  databaseUrl: string
  corsOrigin: string
  nodeEnv: string
}

const getEnvVar = (key: string): string => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}

export const config: Config = {
  port: Number(process.env.PORT) || 3000,
  databaseUrl: getEnvVar('DATABASE_URL'),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',
}
