import type { ThrowData } from '../../pages/player-analysis/types'
import { BOARD_CENTER, BOARD_RADIUS, GRID_SIZE, SVG_SIZE } from './constant'

// Scales raw coordinates (0-800) to SVG coordinates (0-500)
export const scaleToSvg = (val: number): number => (val / GRID_SIZE) * SVG_SIZE

// Checks if throw coordinates are within the 800x800 detection grid
// Excludes (0,0) as it is a known default value when coordinate tracking fails
export const isInGrid = (x: number, y: number): boolean => {
  return x > 0 && x <= GRID_SIZE && y > 0 && y <= GRID_SIZE
}

// Checks if coordinates fall within the circular dartboard (radius 300 from center)
export const isOnBoard = (x: number, y: number): boolean => {
  const dx = x - BOARD_CENTER
  const dy = y - BOARD_CENTER
  return dx * dx + dy * dy <= BOARD_RADIUS * BOARD_RADIUS // formula to chec
}

// A throw is inconsistent when the scoring system recorded a hit
// but the coordinates place it outside the board or at (0,0)
export const isInconsistent = (t: ThrowData): boolean => {
  if (t.x === 0 && t.y === 0) return true
  if (t.modifier > 0 && !isOnBoard(t.x, t.y)) return true
  return false
}

// Determines the dot color based on throw data
export const getThrowColor = (t: ThrowData): string => {
  if (t.modifier === 0) return '#E24B4A'
  if (isInconsistent(t)) return '#FF9800'
  return '#7C4DFF'
}
