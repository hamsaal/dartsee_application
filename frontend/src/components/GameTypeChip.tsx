import { Chip } from '@mui/material'
import { getGameTypeColor } from '../utils/getGameTypeColor'

interface GameTypeChipProps {
  type: string
}

export default function GameTypeChip({ type }: GameTypeChipProps) {
  const color = getGameTypeColor(type)

  return (
    <Chip
      label={type}
      size="small"
      sx={{
        backgroundColor: `${color}15`,
        color: color,
        fontWeight: 600,
      }}
    />
  )
}
