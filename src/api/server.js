import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

// Configurar a conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: '',
})

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err)
    return
  }
  console.log('Conectado ao MySQL!')
})

// Endpoint para login
app.post('/login', (req, res) => {
  const { username, password } = req.body

  const query = 'SELECT * FROM usuario WHERE username = ? AND password = ?'
  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro no servidor' })
    } else if (results.length > 0) {
      res.status(200).json({ success: true })
    } else {
      res
        .status(401)
        .json({ success: false, message: 'Usuário ou senha incorretos' })
    }
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
