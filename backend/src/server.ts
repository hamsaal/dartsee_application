import app from './app'
import { config } from './config/env'
import { db } from './db'

const waitForDatabase = async (): Promise<void> => {
  const startTime = Date.now()
  const timeout = 120000

  while (Date.now() - startTime < timeout) {
    try {
      await db.query('SELECT 1')
      console.log('Database connected')
      return
    } catch {
      const elapsed = Math.round((Date.now() - startTime) / 1000)
      console.log(`Waiting for database... (${elapsed}s elapsed)`)
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
  }

  throw new Error(
    'Database connection timed out. The database may still be loading data. ' +
      'Run "docker compose logs -f postgres" to check progress, ' +
      'then restart with "pnpm dev"'
  )
}

const startServer = async () => {
  await waitForDatabase()

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
  })
}

startServer().catch((err) => {
  console.error('Failed to start server:', err.message)
  process.exit(1)
})
