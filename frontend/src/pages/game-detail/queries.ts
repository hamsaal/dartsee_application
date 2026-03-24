import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../api/client'
import type { GameDetail } from './types'

export const useGameDetail = (id: number) => {
  return useQuery({
    queryKey: ['game', id],
    queryFn: () => apiClient<GameDetail>(`/games/${id}`),
    enabled: id > 0,
  })
}
