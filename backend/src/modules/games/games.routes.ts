import { Router } from 'express'
import { getGamesHandler, getGameDetailHandler } from './games.controller'

const router = Router()

router.get('/', getGamesHandler)
router.get('/:id', getGameDetailHandler)
export default router
