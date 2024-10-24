import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('geoteca', 'root', '741852', {
  //database, user, password
  host: 'localhost',
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
