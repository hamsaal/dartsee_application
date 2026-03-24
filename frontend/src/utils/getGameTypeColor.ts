import { CHART_COLORS } from '../constants/chartColors'
import { GAME_TYPES } from '../constants/gameTypes'

export const getGameTypeColor = (type: string): string => {
  const index = GAME_TYPES.indexOf(type)
  return CHART_COLORS[index % CHART_COLORS.length] ?? CHART_COLORS[0]
}
