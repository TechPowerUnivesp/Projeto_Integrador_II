import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const Avaliacao = sequelize.define(
  'Avaliacao',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    numero_chamada: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    numero_turma: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'avaliacao',
    timestamps: false,
  }
)

export default Avaliacao
