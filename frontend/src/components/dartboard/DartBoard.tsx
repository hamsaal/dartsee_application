import type { ThrowData } from '../../pages/player-analysis/types'

import { scaleToSvg, isInGrid, getThrowColor } from './utils'
import { SEGMENTS, SVG_BOARD_RADIUS, SVG_CENTER, SVG_SIZE } from './constant'

interface DartBoardProps {
  throws: ThrowData[]
}

export default function DartBoard({ throws }: DartBoardProps) {
  // Separate plottable throws from those with unreliable coordinates
  // (0,0) is plotted as inconsistent, out-of-grid throws cannot be plotted
  const plottableThrows = throws.filter((t) => isInGrid(t.x, t.y) || (t.x === 0 && t.y === 0))
  const unplottableCount = throws.length - plottableThrows.length

  return (
    <div>
      <svg viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} width="100%" style={{ maxWidth: 500 }}>
        {/* Detection area background */}
        <rect x="0" y="0" width={SVG_SIZE} height={SVG_SIZE} fill="#1a1a1a" rx="4" />

        {/* Board circle */}
        <circle
          cx={SVG_CENTER}
          cy={SVG_CENTER}
          r={SVG_BOARD_RADIUS}
          fill="#2a2a2a"
          stroke="#444"
          strokeWidth="0.5"
        />

        {/* Double ring (outermost scoring ring) */}
        <circle
          cx={SVG_CENTER}
          cy={SVG_CENTER}
          r={SVG_BOARD_RADIUS}
          fill="none"
          stroke="#555"
          strokeWidth="8"
        />

        {/* Treble ring (inner scoring ring) */}
        <circle
          cx={SVG_CENTER}
          cy={SVG_CENTER}
          r={SVG_BOARD_RADIUS * 0.63}
          fill="none"
          stroke="#555"
          strokeWidth="6"
        />

        {/* Outer bull (25 points) */}
        <circle cx={SVG_CENTER} cy={SVG_CENTER} r="20" fill="#2d8a4e" opacity="0.7" />

        {/* Inner bull / bullseye (50 points) */}
        <circle cx={SVG_CENTER} cy={SVG_CENTER} r="8" fill="#c0392b" opacity="0.8" />

        {/* Segment numbers around the board */}
        {SEGMENTS.map((num: number, i: number) => {
          const angle = (i * 18 - 90) * (Math.PI / 180)
          const x = SVG_CENTER + Math.cos(angle) * (SVG_BOARD_RADIUS + 25)
          const y = SVG_CENTER + Math.sin(angle) * (SVG_BOARD_RADIUS + 25)
          return (
            <text
              key={num}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#999"
              fontSize="12"
            >
              {num}
            </text>
          )
        })}

        {/* Throw position dots */}
        {plottableThrows.map((t) => (
          <circle
            key={t.id}
            cx={scaleToSvg(t.x)}
            cy={scaleToSvg(t.y)}
            r="6"
            fill={getThrowColor(t)}
            opacity="0.85"
          />
        ))}
      </svg>

      {unplottableCount > 0 && (
        <p style={{ color: '#999', fontSize: '0.85rem', marginTop: 8 }}>
          {unplottableCount} throw{unplottableCount > 1 ? 's' : ''} outside detection area and could
          not be plotted
        </p>
      )}
    </div>
  )
}
