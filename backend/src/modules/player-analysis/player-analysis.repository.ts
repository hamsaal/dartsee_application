import { db } from '../../db'
import { AppError } from '../../middleware/error.middleware'
import { PLAYER_ANALYSIS_QUERIES } from './player-analysis.queries'
import type { ThrowData, PlayerInfo, GameInfo } from './player-analysis.types'

export const getPlayerThrowsByGame = async (
  gameId: number,
  playerId: string
): Promise<{ player: PlayerInfo; game: GameInfo; throws: ThrowData[] } | null> => {
  try {
    const { getGame, getPlayer, getPlayerThrows } = PLAYER_ANALYSIS_QUERIES

    const game = await db.query<GameInfo>(getGame, [gameId])
    if (!game.rows[0]) return null

    const player = await db.query<PlayerInfo>(getPlayer, [playerId])
    if (!player.rows[0]) return null

    const { rows } = await db.query<ThrowData>(getPlayerThrows, [gameId, playerId])

    return {
      player: player.rows[0],
      game: game.rows[0],
      throws: rows,
    }
  } catch {
    throw new AppError(500, 'Failed to fetch player analysis')
  }
}
