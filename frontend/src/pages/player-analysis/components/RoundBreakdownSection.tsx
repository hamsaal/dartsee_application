import { useState } from 'react'
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material'
import type { Round } from '../player-analysis.types'

interface RoundBreakdownSectionProps {
  rounds: Round[]
}

export default function RoundBreakdownSection({ rounds }: RoundBreakdownSectionProps) {
  const [page, setPage] = useState(0)
  const rowsPerPage = 10
  const paginatedRounds = rounds.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
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
                  {round.isComplete ? round.total : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {rounds.some((r) => !r.isComplete) && (
        <Typography variant="body2" color="text.secondary" sx={{ px: 2, py: 1 }}>
          * Incomplete round — not included in average calculation
        </Typography>
      )}
      <TablePagination
        component="div"
        count={rounds.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10]}
      />
    </Paper>
  )
}
