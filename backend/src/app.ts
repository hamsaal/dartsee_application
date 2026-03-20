import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { config } from './config/env'
import { AppError, errorMiddleware } from './middleware/error.middleware'
import { loggerMiddleware } from './middleware/logger.middleware'

const app = express()

app.use(helmet())
app.use(cors({ origin: config.corsOrigin }))
app.use(express.json())
app.use(loggerMiddleware)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})

app.use((_req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${_req.method} ${_req.url} not found`,
  })
})

app.get('/test-error', () => {
  throw new AppError(400, 'Test error works')
})

app.use(errorMiddleware)

export default app
