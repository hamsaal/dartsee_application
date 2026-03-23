import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Grid,
} from '@mui/material'
import { usePlayerAnalysis } from './player-analysis.queries'
import { groupIntoRounds, calculateStats } from './player-analysis.utils'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorAlert from '../../components/ErrorAlert'
import GameTypeChip from '../../components/GameTypeChip'
import DartBoard from '../../components/DartBoard'

export default function PlayerAnalysisPage() {
  const { gameId, playerId } = useParams()
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const rowsPerPage = 10

  const gId = parseInt(gameId ?? '0', 10)
  const pId = playerId ?? ''

  const { data, isLoading, error } = usePlayerAnalysis(gId, pId)

  if (isNaN(gId) || gId <= 0 || !pId) return <ErrorAlert message="Invalid parameters" />
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorAlert message={error.message} />

  const rounds = groupIntoRounds(data?.throws ?? [])
  const stats = calculateStats(data?.throws ?? [], rounds)
  const paginatedRounds = rounds.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

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
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Throw Map
            </Typography>
            <DartBoard throws={data?.throws ?? []} />
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box
                  sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#7C4DFF' }}
                />
                <Typography variant="body2">Hit</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box
                  sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#E24B4A' }}
                />
                <Typography variant="body2">Miss</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Summary
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total throws
                </Typography>
                <Typography variant="h6">{stats.totalThrows}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Accuracy
                </Typography>
                <Typography variant="h6">{stats.accuracy}%</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Best round
                </Typography>
                <Typography variant="h6">{stats.bestRound}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Worst round
                </Typography>
                <Typography variant="h6">{stats.worstRound}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Avg per round
                </Typography>
                <Typography variant="h6">{stats.avgRound}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Misses
                </Typography>
                <Typography variant="h6">{stats.misses}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={1} sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Round Breakdown
        </Typography>
        <TableContainer>
          <Table sx={{ tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <TableCell>Round</TableCell>
                <TableCell align="right">Throw 1</TableCell>
                <TableCell align="right">Throw 2</TableCell>
                <TableCell align="right">Throw 3</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRounds.map((round) => (
                <TableRow key={round.number}>
                  <TableCell>{round.number}</TableCell>
                  <TableCell align="right">
                    {round.throws[0] ? round.throws[0].score * round.throws[0].modifier : '-'}
                  </TableCell>
                  <TableCell align="right">
                    {round.throws[1] ? round.throws[1].score * round.throws[1].modifier : '-'}
                  </TableCell>
                  <TableCell align="right">
                    {round.throws[2] ? round.throws[2].score * round.throws[2].modifier : '-'}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    {round.total}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rounds.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
        />
      </Paper>
    </Container>
  )
}
