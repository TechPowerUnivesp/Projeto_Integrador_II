import express from 'express'
import cors from 'cors'
import router from './routes/login.js'
import sequelize from './config/db.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// Use o roteador de login
app.use('/api', router)

// Verifique a conexão com o banco de dados e sincronize
sequelize
  .authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso.')

    // Sincronizar o Sequelize com o banco de dados
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
