import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const Resposta = sequelize.define(
  'Resposta',
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    texto_resposta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ID_questao: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Correta: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  {
    tableName: 'resposta',
    timestamps: false,
  }
)

export default Resposta
