import type { RequestHandler } from 'express'
import { getGameTypes } from './service'

export const getGameTypesStatsHandler: RequestHandler = async (_req, res) => {
  const data = await getGameTypes()
  res.json(data)
}
