import { Paper, Typography, Box } from '@mui/material'

interface SummarySectionProps {
  stats: {
    totalThrows: number
    totalRounds: number
    bestRound: number
    worstRound: number
    misses: number
  }
}

const StatItem = ({ label, value }: { label: string; value: string | number }) => (
  <Box>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="h6">{value}</Typography>
  </Box>
)

export default function SummarySection({ stats }: SummarySectionProps) {
  return (
    <Paper elevation={1} sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Summary
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <StatItem label="Total throws" value={stats.totalThrows} />
        <StatItem label="Total rounds" value={stats.totalRounds} />
        <StatItem label="Average of Best round" value={stats.bestRound} />
        <StatItem label="Average of Worst round" value={stats.worstRound} />
        <StatItem label="Misses" value={stats.misses} />
      </Box>
    </Paper>
  )
}
