import { db } from '../../db'
import { AppError } from '../../middleware/error.middleware'
import type { Game, GamesListResponse, RawGameDetail, PlayerRow } from './games.types'

export const getAllGames = async (page: number, limit: number): Promise<GamesListResponse> => {
  try {
    const offset = (page - 1) * limit
    const { rows } = await db.query<Game>(
      'SELECT id, type FROM games ORDER BY id DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    )
    const count = await db.query<{ count: string }>(
      'SELECT COUNT(*) as count FROM games'
    )
    return {
      data: rows,
      total: parseInt(count.rows[0].count),
    }
  } catch {
    throw new AppError(500, 'Failed to fetch games')
  }
}

export const getGameById = async (id: number): Promise<RawGameDetail | null> => {
  try {
    const game = await db.query<Game>(
      'SELECT id, type FROM games WHERE id = $1',
      [id]
    )

    if (!game.rows[0]) return null

    const { rows } = await db.query<PlayerRow>(
      `SELECT
        p.id,
        p.name,
        t.score,
        t.modifier
       FROM game_players gp
       JOIN players p ON p.id = gp.player_id
       LEFT JOIN throws t ON t.player_id = p.id AND t.game_id = $1
       WHERE gp.game_id = $1
       ORDER BY p.id, t.id ASC`,
      [id]
    )

    return {
      ...game.rows[0],
      playerRows: rows,
    }
  } catch {
    throw new AppError(500, 'Failed to fetch game')
  }
}
