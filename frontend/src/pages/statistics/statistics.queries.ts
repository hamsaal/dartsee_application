import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../api/client'
import type { GameTypeStats } from './statistics.types'

export const useGameTypeStats = () => {
  return useQuery({
    queryKey: ['statistics', 'game-types'],
    queryFn: () => apiClient<GameTypeStats[]>('/statistics/game-types'),
  })
}
