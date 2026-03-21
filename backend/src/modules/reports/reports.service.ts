import { getGameTypeReport } from './reports.repository'
import type { GameTypeReport } from './reports.types'

export const getGameTypes = async (): Promise<GameTypeReport[]> => {
  return getGameTypeReport()
}
