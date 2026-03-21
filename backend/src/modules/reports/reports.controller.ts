import type { RequestHandler } from 'express'
import { getGameTypes } from './reports.service'

export const getGameTypesHandler: RequestHandler = async (_req, res) => {
  const data = await getGameTypes()
  res.json(data)
}
