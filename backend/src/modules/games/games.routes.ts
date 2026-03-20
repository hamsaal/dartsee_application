import { Router } from 'express'
import { getGamesHandler } from './games.controller'

const router = Router()

router.get('/', getGamesHandler)

export default router
