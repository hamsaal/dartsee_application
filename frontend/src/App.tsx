import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { QueryClientProvider } from '@tanstack/react-query'
import theme from './theme/theme'
import Navbar from './components/NavBar'
import NotFoundPage from './pages/NotFound'
import StatisticsPage from './pages/statistics/StatisticsPage'
import { queryClient } from './config/queryClient'
import PlayerAnalysisPage from './pages/player-analysis/PlayerAnalysisPage'
import GameDetailPage from './pages/game-detail/GameDetailPage'
import GamesListPage from './pages/games-list/GamesListPage'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<GamesListPage />} />
            <Route path="/games/:id" element={<GameDetailPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="/games/:gameId/players/:playerId/analysis"
              element={<PlayerAnalysisPage />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
