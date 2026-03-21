import type { RequestHandler } from 'express'
import { getGames } from './games.service'

export const getGamesHandler: RequestHandler = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1)
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20))
  const data = await getGames(page, limit)
  res.json(data)
}
