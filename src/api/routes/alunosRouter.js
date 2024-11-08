import express from 'express'
import {
  getAlunos,
  getRespostasAluno,
} from '../controllers/respostasAlunosController.js'

const alunosRouter = express.Router()

alunosRouter.get('/alunos', getAlunos)
alunosRouter.get('/alunos/respostas', getRespostasAluno)

export default alunosRouter
