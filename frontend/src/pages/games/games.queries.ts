import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { apiClient } from '../../api/client'
import type { GamesListResponse } from './games.types'

export const useGames = (page: number, limit: number = 20) => {
  return useQuery({
    queryKey: ['games', page, limit],
    queryFn: () => apiClient<GamesListResponse>(`/games?page=${page}&limit=${limit}`),
    placeholderData: keepPreviousData,
  })
}
