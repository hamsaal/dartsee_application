import { db } from '../../../db'
import { AppError } from '../../../middleware/error.middleware'
import { DETAIL_QUERIES } from './queries'
import type { Game } from '../common/types'
import type { RawGameDetail, PlayerRow } from './types'

export const getGameById = async (id: number): Promise<RawGameDetail | null> => {
  try {
    const { getGameById: getGameByIdQuery, getPlayersByGameId } = DETAIL_QUERIES
    const game = await db.query<Game>(getGameByIdQuery, [id])

    if (!game.rows[0]) return null

    const { rows } = await db.query<PlayerRow>(getPlayersByGameId, [id])

    return {
      ...game.rows[0],
      playerRows: rows,
    }
  } catch {
    throw new AppError(500, 'Failed to fetch game')
  }
}
