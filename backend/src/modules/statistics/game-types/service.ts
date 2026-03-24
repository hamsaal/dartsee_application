import { getGameTypeStats } from './repository'
import type { GameTypeStats } from './types'

export const getGameTypes = async (): Promise<GameTypeStats[]> => {
  return getGameTypeStats()
}
