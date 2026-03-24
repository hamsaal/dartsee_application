import { Paper, Typography, Box } from '@mui/material'
import DartBoard from '../../../components/dartboard/DartBoard'

import type { ThrowData } from '../types'
import { THROW_LEGEND } from '../contants/throwLegends'

interface ThrowMapSectionProps {
  throws: ThrowData[]
}

export default function ThrowMapSection({ throws }: ThrowMapSectionProps) {
  return (
    <Paper elevation={1} sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Throw Map
      </Typography>
      <DartBoard throws={throws} />
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        {THROW_LEGEND.map(({ color, label }) => (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: color }} />
            <Typography variant="body2">{label}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  )
}
