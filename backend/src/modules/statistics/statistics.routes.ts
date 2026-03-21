import { Router } from 'express'
import { getGameTypesStatsHandler } from './statistics.controller'

const statisticsRouter = Router()

statisticsRouter.get('/game-types', getGameTypesStatsHandler)

export default statisticsRouter
