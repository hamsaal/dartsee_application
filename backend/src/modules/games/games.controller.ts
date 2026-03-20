import type { RequestHandler } from 'express'
import { getGames } from './games.service'

export const getGamesHandler: RequestHandler = async (_req, res) => {
  const data = await getGames()
  res.json(data)
}
