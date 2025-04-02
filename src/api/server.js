import express from 'express'
import cors from 'cors'
import loginRouter from './routes/loginRouter.js'
import questaoRouter from './routes/questaoRouter.js'
import respostaRouter from './routes/respostaRouter.js'
import alunosRouter from './routes/alunosRouter.js'
import sequelize from './config/db.js'
import estatisticasRouter from './routes/estatisticasRouter.js'
import { seedDatabase } from './seed_db.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// Use the routers
app.use('/api', alunosRouter)
app.use('/api', loginRouter)
app.use('/api', questaoRouter)
app.use('/api', respostaRouter)
app.use('/api', estatisticasRouter)

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
      seedDatabase();
      console.log(`Servidor rodando na porta ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err)
  })
