import express from 'express'
import professorController from '../controllers/professorController.js'
// import alunoController from '../controllers/alunoController.js'

const router = express.Router()

// Rotas para login e registro de professores
router.post('/professor/login', professorController.login)
router.post('/professor/register', professorController.register)

// // Rotas para login e registro de alunos
// router.post('/aluno/login', alunoController.login)
// router.post('/aluno/register', alunoController.register)

export default router
