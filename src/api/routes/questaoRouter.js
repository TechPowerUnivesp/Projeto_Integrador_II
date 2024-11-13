import express from 'express'
import questaoController from '../controllers/questaoController.js'

const questaoRouter = express.Router()

questaoRouter.get('/questoes', questaoController.getQuestoes)

export default questaoRouter
