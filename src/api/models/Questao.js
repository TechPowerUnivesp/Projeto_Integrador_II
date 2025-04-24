import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

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
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'questao',
    timestamps: false,
  }
)

export default Questao
