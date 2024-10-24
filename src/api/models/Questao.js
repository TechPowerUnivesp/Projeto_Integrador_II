import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'
import Resposta from './Resposta.js'

const Questao = sequelize.define(
  'Questao',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    enunciado: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    disciplina: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'questao',
    timestamps: false,
  }
)

// Definindo a associação hasMany
Questao.hasMany(Resposta, { as: 'respostas', foreignKey: 'ID_questao' })
Resposta.belongsTo(Questao, { foreignKey: 'ID_questao' })

export default Questao
