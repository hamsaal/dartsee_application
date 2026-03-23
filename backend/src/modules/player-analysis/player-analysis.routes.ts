import { Router } from 'express'
import { getPlayerAnalysisHandler } from './player-analysis.controller'

const playerAnalysisRouter = Router()

playerAnalysisRouter.get('/:gameId/:playerId', getPlayerAnalysisHandler)

export default playerAnalysisRouter
