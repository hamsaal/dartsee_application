import { useParams, useNavigate } from 'react-router-dom'
import { Container, Typography, Box, Button, Grid } from '@mui/material'
import { usePlayerAnalysis } from './queries'
import { groupIntoRounds, calculateStats } from './utils'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorAlert from '../../components/ErrorAlert'
import GameTypeChip from '../../components/GameTypeChip'
import ThrowMapSection from './components/ThrowMapSection'
import SummarySection from './components/SummarySection'
import RoundBreakdownSection from './components/RoundBreakdownSection'

export default function PlayerAnalysisPage() {
  const { gameId, playerId } = useParams()
  const navigate = useNavigate()

  const gId = parseInt(gameId ?? '0', 10)
  const pId = playerId ?? ''

  const { data, isLoading, error } = usePlayerAnalysis(gId, pId)

  if (isNaN(gId) || gId <= 0 || !pId) return <ErrorAlert message="Invalid parameters" />
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorAlert message={error.message} />

  const rounds = groupIntoRounds(data?.throws ?? [])
  const stats = calculateStats(data?.throws ?? [], rounds)

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button onClick={() => navigate(`/games/${gId}`)} sx={{ mb: 2 }}>
        ← Back to game
      </Button>

      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
        {data?.player.name}
      </Typography>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Game #{data?.game.id}
        </Typography>
        <GameTypeChip type={data?.game.type ?? ''} />
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ThrowMapSection throws={data?.throws ?? []} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SummarySection stats={stats} />
        </Grid>
      </Grid>

      <RoundBreakdownSection rounds={rounds} />
    </Container>
  )
}
