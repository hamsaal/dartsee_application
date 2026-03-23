import { getPlayerThrowsByGame } from './player-analysis.repository'
import { AppError } from '../../middleware/error.middleware'
import type { PlayerAnalysisResponse } from './player-analysis.types'

export const getPlayerAnalysis = async (
  gameId: number,
  playerId: string
): Promise<PlayerAnalysisResponse> => {
  const data = await getPlayerThrowsByGame(gameId, playerId)
  if (!data) throw new AppError(404, 'Game or player not found')
  return data
}
