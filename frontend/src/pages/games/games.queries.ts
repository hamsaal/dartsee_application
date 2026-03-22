import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { apiClient } from '../../api/client'
import type { GamesListResponse, GameDetail } from './games.types'

export const useGames = (page: number, limit: number = 20) => {
  return useQuery({
    queryKey: ['games', page, limit],
    queryFn: () => apiClient<GamesListResponse>(`/games?page=${page}&limit=${limit}`),
    placeholderData: keepPreviousData,
  })
}

export const useGameDetail = (id: number) => {
  return useQuery({
    queryKey: ['game', id],
    queryFn: () => apiClient<GameDetail>(`/games/${id}`),
    enabled: id > 0,
  })
}
