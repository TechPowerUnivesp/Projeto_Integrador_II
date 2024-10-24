import express from 'express'
import professorController from '../controllers/professorController.js'

const loginRouter = express.Router()

loginRouter.post('/professor/login', professorController.login)
loginRouter.post('/professor/register', professorController.register)

export default loginRouter
