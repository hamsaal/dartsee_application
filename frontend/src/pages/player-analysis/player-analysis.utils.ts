import type { ThrowData, Round } from './player-analysis.types'

export const groupIntoRounds = (throws: ThrowData[]): Round[] => {
  const rounds: Round[] = []
  for (let i = 0; i < throws.length; i += 3) {
    const roundThrows = throws.slice(i, i + 3)
    rounds.push({
      number: Math.floor(i / 3) + 1,
      throws: roundThrows,
      total: roundThrows.reduce((sum, t) => sum + t.score * t.modifier, 0),
      isComplete: roundThrows.length === 3,
    })
  }
  return rounds
}

export const calculateStats = (throws: ThrowData[], rounds: Round[]) => {
  const completeRounds = rounds.filter((r) => r.isComplete)
  const hits = throws.filter((t) => t.modifier > 0).length
  const misses = throws.filter((t) => t.modifier === 0).length

  return {
    totalThrows: throws.length,
    hits,
    misses,
    accuracy: throws.length > 0 ? Math.round((hits / throws.length) * 100) : 0,
    totalRounds: completeRounds.length,
    bestRound: completeRounds.length > 0 ? Math.max(...completeRounds.map((r) => r.total)) : 0,
    worstRound: completeRounds.length > 0 ? Math.min(...completeRounds.map((r) => r.total)) : 0,
    avgRound:
      completeRounds.length > 0
        ? Math.round(
            (completeRounds.reduce((sum, r) => sum + r.total, 0) / completeRounds.length) * 100
          ) / 100
        : 0,
  }
}
