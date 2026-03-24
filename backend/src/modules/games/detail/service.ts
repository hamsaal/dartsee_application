import { getGameById } from './repository'
import { AppError } from '../../../middleware/error.middleware'
import type { GameDetail, Player, PlayerRow } from './types'

const calculateAvgScorePerRound = (throws: PlayerRow[]): number => {
  if (throws.length === 0) return 0

  const validThrows = throws.filter((t) => t.score !== null)
  if (validThrows.length === 0) return 0

  const rounds: number[][] = []
  for (let i = 0; i < validThrows.length; i += 3) {
    const round = validThrows
      .slice(i, i + 3)
      .map((t) => (t.score as number) * (t.modifier as number))
    if (round.length === 3) {
      rounds.push(round)
    }
  }

  if (rounds.length === 0) return 0

  const roundTotals = rounds.map((round) => round.reduce((sum, score) => sum + score, 0))
  const avg = roundTotals.reduce((sum, total) => sum + total, 0) / roundTotals.length

  return Math.round(avg * 100) / 100
}

const countMisses = (throws: PlayerRow[]): number => {
  return throws.filter((t) => t.modifier === 0).length
}

const groupByPlayer = (playerRows: PlayerRow[]): Map<string, PlayerRow[]> => {
  const map = new Map<string, PlayerRow[]>()
  for (const row of playerRows) {
    if (!map.has(row.id)) {
      map.set(row.id, [])
    }
    map.get(row.id)!.push(row)
  }
  return map
}

export const getGameDetail = async (id: number): Promise<GameDetail> => {
  const raw = await getGameById(id)
  if (!raw) throw new AppError(404, 'Game not found')

  const playerMap = groupByPlayer(raw.playerRows)

  const players: Player[] = Array.from(playerMap.entries()).map(([, throws]) => {
    const { id, name } = throws[0]
    return {
      id,
      name,
      avg_score: calculateAvgScorePerRound(throws),
      miss_count: countMisses(throws),
    }
  })

  return {
    id: raw.id,
    type: raw.type,
    players,
  }
}
