import { db } from '../../db'
import { AppError } from '../../middleware/error.middleware'
import type { GameTypeReport } from './reports.types'

export const getGameTypeReport = async (): Promise<GameTypeReport[]> => {
  try {
    const { rows } = await db.query<GameTypeReport>(
      `SELECT g.type, COUNT(DISTINCT g.id) as count
       FROM games g
       INNER JOIN game_players gp ON gp.game_id = g.id
       GROUP BY g.type
       ORDER BY count DESC`
    )
    return rows.map((row) => ({
      type: row.type,
      count: Number(row.count),
    }))
  } catch {
    throw new AppError(500, 'Failed to fetch game type report')
  }
}
