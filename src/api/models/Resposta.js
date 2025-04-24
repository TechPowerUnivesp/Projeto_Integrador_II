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
    },
    texto_resposta: {
      type: DataTypes.TEXT,
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
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: 'resposta',
    timestamps: false,
  }
)

export default Resposta
