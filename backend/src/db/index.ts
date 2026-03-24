import { Pool } from 'pg'
import { config } from '../config/env'

export const db: Pool = new Pool({
  connectionString: config.databaseUrl,
})

db.on('error', (err: Error) => {
  console.error('Unexpected database error', err)
  process.exit(-1)
})
