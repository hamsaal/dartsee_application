import { Router } from 'express'
import { getGamesHandler, getGameDetailHandler } from './games.controller'

const gamesrouter = Router()

gamesrouter.get('/', getGamesHandler)
gamesrouter.get('/:id', getGameDetailHandler)
export default gamesrouter
