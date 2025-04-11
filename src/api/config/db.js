import { Sequelize } from 'sequelize'

// Use environment variables with fallbacks for local development
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || '741852'
const DB_NAME = process.env.DB_NAME || 'geoteca'

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso.')
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err)
  })

export default sequelize
