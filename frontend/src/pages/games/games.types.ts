export interface Game {
  id: number
  type: string
}

export interface GamesListResponse {
  data: Game[]
  total: number
}
