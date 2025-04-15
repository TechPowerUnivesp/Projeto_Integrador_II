import { Sequelize } from 'sequelize'

// Use environment variables with fallbacks for local development
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_USER = process.env.DB_USER || 'postgres'
const DB_PASSWORD = process.env.DB_PASSWORD || 'changeme'
const DB_NAME = process.env.DB_NAME || 'geoteca'
const DB_PORT = process.env.DB_PORT || '5432'

const dialectOptions = (DB_HOST !== 'localhost' && DB_HOST !== 'db') ? {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
} : {};
console.log('dialectOptions', dialectOptions)

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  dialectOptions: dialectOptions,
  logging: console.log
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
