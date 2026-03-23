import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../api/client'
import type { PlayerAnalysisResponse } from './player-analysis.types'

export const usePlayerAnalysis = (gameId: number, playerId: string) => {
  return useQuery({
    queryKey: ['player-analysis', gameId, playerId],
    queryFn: () => apiClient<PlayerAnalysisResponse>(`/player-analysis/${gameId}/${playerId}`),
    enabled: gameId > 0 && playerId.length > 0,
  })
}
