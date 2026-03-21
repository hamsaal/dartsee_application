import type { RequestHandler } from 'express'
import { getGames, getGameDetail } from './games.service'
import { AppError } from '../../middleware/error.middleware'

export const getGamesHandler: RequestHandler = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1)
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20))
  const data = await getGames(page, limit)
  res.json(data)
}

export const getGameDetailHandler: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id as string)
  if (isNaN(id) || id <= 0) throw new AppError(400, 'Invalid game id')
  const data = await getGameDetail(id)
  res.json(data)
}
