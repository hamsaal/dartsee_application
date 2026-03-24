import { Router } from 'express'
import { getGameTypesStatsHandler } from './game-types/controller'

const statisticsRouter = Router()

statisticsRouter.get('/game-types', getGameTypesStatsHandler)

export default statisticsRouter
