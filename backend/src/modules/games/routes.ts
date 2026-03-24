import { Router } from 'express'
import { getGamesHandler } from './list/controller'
import { getGameDetailHandler } from './detail/controller'

const gamesRouter = Router()

gamesRouter.get('/', getGamesHandler)
gamesRouter.get('/:id', getGameDetailHandler)

export default gamesRouter
