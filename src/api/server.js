import express from 'express'
import cors from 'cors'
import loginRouter from './routes/login.js'
import questaoRouter from './routes/questao.js'
import respostaRouter from './routes/resposta.js'
import sequelize from './config/db.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// Use the routers
app.use('/api', loginRouter)
app.use('/api', questaoRouter)
app.use('/api', respostaRouter)

// Verify the database connection and synchronize
sequelize
  .authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso.')

    // Synchronize Sequelize with the database
    return sequelize.sync()
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err)
  })
