import type { ThrowData } from '../pages/player-analysis/player-analysis.types'

interface DartBoardProps {
  throws: ThrowData[]
}

export default function DartBoard({ throws }: DartBoardProps) {
  const scale = (val: number) => (val / 800) * 400

  return (
    <svg viewBox="0 0 400 400" width="100%" style={{ maxWidth: 400 }}>
      {/* Detection area */}
      <rect x="0" y="0" width="400" height="400" fill="#1a1a1a" rx="4" />

      {/* Board */}
      <circle cx="200" cy="200" r="150" fill="#2a2a2a" stroke="#444" strokeWidth="0.5" />

      {/* Double ring */}
      <circle cx="200" cy="200" r="150" fill="none" stroke="#555" strokeWidth="8" />

      {/* Treble ring */}
      <circle cx="200" cy="200" r="95" fill="none" stroke="#555" strokeWidth="6" />

      {/* Outer bull */}
      <circle cx="200" cy="200" r="16" fill="#2d8a4e" opacity="0.7" />

      {/* Inner bull */}
      <circle cx="200" cy="200" r="6" fill="#c0392b" opacity="0.8" />

      {/* Throw dots */}
      {throws.map((t) => {
        const x = scale(t.x)
        const y = scale(t.y)
        const isMiss = t.modifier === 0

        if (x < 0 || x > 400 || y < 0 || y > 400) return null

        return (
          <circle
            key={t.id}
            cx={x}
            cy={y}
            r="4"
            fill={isMiss ? '#E24B4A' : '#7C4DFF'}
            opacity="0.8"
          />
        )
      })}
    </svg>
  )
}
