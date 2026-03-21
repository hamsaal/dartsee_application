import { getGameTypeStats } from './statistics.repository'
import type { GameTypeStats } from './statistics.types'

export const getGameTypes = async (): Promise<GameTypeStats[]> => {
  return getGameTypeStats()
}
