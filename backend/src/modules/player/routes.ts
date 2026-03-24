import { Router } from 'express'
import { getPlayerAnalysisHandler } from './analysis/controller'

const playerRouter = Router()

playerRouter.get('/analysis/:gameId/:playerId', getPlayerAnalysisHandler)

export default playerRouter
