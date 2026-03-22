import { Container, Typography, Paper } from '@mui/material'
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useGameTypeStats } from './statistics.queries'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorAlert from '../../components/ErrorAlert'
import { getGameTypeColor } from '../../utils/getGameTypeColor'

export default function StatisticsPage() {
  const { data, isLoading, error } = useGameTypeStats()
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorAlert message={error.message} />
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
              data={data?.map((item) => ({
                ...item,
                fill: getGameTypeColor(item.type),
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
