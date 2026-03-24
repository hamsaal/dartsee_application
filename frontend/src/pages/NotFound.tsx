import { useNavigate } from 'react-router-dom'
import { Container, Typography, Button, Box } from '@mui/material'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mt: 12 }}>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          404
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>
          Page not found
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 3 }}>
          Back to games
        </Button>
      </Box>
    </Container>
  )
}
