import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material'
import { useGameDetail } from './games.queries'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorAlert from '../../components/ErrorAlert'

export default function GameDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const gameId = parseInt(id ?? '0', 10)

  const { data, isLoading, error } = useGameDetail(gameId)
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorAlert message={error.message} />

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button onClick={() => navigate('/')} sx={{ mb: 2 }}>
        ← Back to games
      </Button>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
        Game #{data?.id}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
        Type: {data?.type}
      </Typography>
      <TableContainer component={Paper} elevation={1}>
        <Table sx={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell align="right">Avg Score / Round</TableCell>
              <TableCell align="right">Misses</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.players.map((player) => (
              <TableRow key={player.id}>
                <TableCell>{player.name}</TableCell>
                <TableCell align="right">{player.avg_score}</TableCell>
                <TableCell align="right">{player.miss_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
