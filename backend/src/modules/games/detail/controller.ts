import type { RequestHandler } from 'express'
import { getGameDetail } from './service'
import { AppError } from '../../../middleware/error.middleware'

export const getGameDetailHandler: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id as string)
  if (isNaN(id) || id <= 0) throw new AppError(400, 'Invalid game id')
  const data = await getGameDetail(id)
  res.json(data)
}
