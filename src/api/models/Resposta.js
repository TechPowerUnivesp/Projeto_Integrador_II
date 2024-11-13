// File: src/api/models/Resposta.js

import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const Resposta = sequelize.define(
  'Resposta',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'ID', // Mapeia para a coluna 'ID' no banco
    },
    texto_resposta: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'texto_resposta',
    },
    questao_id: {
      // Nome da propriedade usado no Sequelize
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'questao',
        key: 'id',
      },
      field: 'ID_questao', // Mapeia para a coluna 'ID_questao' no banco
    },
    correta: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: 'Correta', // Mapeia para a coluna 'Correta' no banco
    },
  },
  {
    tableName: 'resposta',
    timestamps: false,
  }
)

export default Resposta
