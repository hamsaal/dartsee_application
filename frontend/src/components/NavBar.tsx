import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer', fontWeight: 700 }}
        >
          Dartsee
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          color="inherit"
          onClick={() => navigate('/')}
          sx={{
            opacity: location.pathname === '/' ? 1 : 0.7,
          }}
        >
          Games
        </Button>
        <Button
          color="inherit"
          onClick={() => navigate('/statistics')}
          sx={{
            opacity: location.pathname === '/statistics' ? 1 : 0.7,
          }}
        >
          Statistics
        </Button>
      </Toolbar>
    </AppBar>
  )
}
