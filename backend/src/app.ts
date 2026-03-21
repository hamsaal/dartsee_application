import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import { config } from './config/env'
import { swaggerSpec } from './config/swagger'
import { errorMiddleware } from './middleware/error.middleware'
import { loggerMiddleware } from './middleware/logger.middleware'
import gamesRoutes from './modules/games/games.routes'
import statisticsRouter from './modules/statistics/statistics.routes'

const app = express()

app.use(helmet())
app.use(cors({ origin: config.corsOrigin }))
app.use(express.json())
app.use(loggerMiddleware)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})
app.use('/api/v1/games', gamesRoutes)
app.use('/api/v1/statistics', statisticsRouter)
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.url} not found`,
  })
})

app.use(errorMiddleware)

export default app
