import type { RequestHandler } from 'express'
import { getPlayerAnalysis } from './player-analysis.service'
import { AppError } from '../../middleware/error.middleware'

export const getPlayerAnalysisHandler: RequestHandler = async (req, res) => {
  const gameId = parseInt(req.params.gameId as string)
  const playerId = req.params.playerId as string
  if (isNaN(gameId) || gameId <= 0) throw new AppError(400, 'Invalid game id')
  if (!playerId) throw new AppError(400, 'Invalid player id')
  const data = await getPlayerAnalysis(gameId, playerId)
  res.json(data)
}
