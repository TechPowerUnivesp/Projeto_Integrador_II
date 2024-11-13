import express from 'express'
import respostaController from '../controllers/respostaController.js'

const respostaRouter = express.Router()

respostaRouter.post('/respostas', respostaController.enviarRespostas)

export default respostaRouter
