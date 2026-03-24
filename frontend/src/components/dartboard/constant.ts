// Dartboard coordinate system (from assignment spec)
// Detection area: 800x800 square
// Board center: (400, 400)
// Board radius: 300
// Coordinates start from top-left corner (0,0)

export const BOARD_CENTER = 400
export const BOARD_RADIUS = 300
export const GRID_SIZE = 800
export const SVG_SIZE = 500
export const SVG_CENTER = SVG_SIZE / 2
export const SVG_BOARD_RADIUS = (BOARD_RADIUS / GRID_SIZE) * SVG_SIZE

// Standard dartboard segment order (clockwise from top)
export const SEGMENTS = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5]
