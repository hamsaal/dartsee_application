import { Container, Typography, Paper, CircularProgress, Alert, Box } from '@mui/material'
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useGameTypeStats } from './statistics.queries'

const COLORS = [
  '#6C3CE1',
  '#E91E63',
  '#FF9800',
  '#4CAF50',
  '#2196F3',
  '#FF5722',
  '#009688',
  '#795548',
]

export default function StatisticsPage() {
  const { data, isLoading, error } = useGameTypeStats()

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error.message}</Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Game Statistics
      </Typography>
      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Games by Type
        </Typography>
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Pie
              data={data?.map((item, index) => ({
                ...item,
                fill: COLORS[index % COLORS.length],
              }))}
              dataKey="count"
              nameKey="type"
              cx="50%"
              cy="45%"
              outerRadius={150}
            />
            <Tooltip />
            <Legend wrapperStyle={{ paddingTop: 20 }} />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Container>
  )
}
