import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const RespostasAluno = sequelize.define(
  'RespostasAluno',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    numero_chamada: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero_turma: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avaliacao_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'avaliacao',
        key: 'id',
      },
    },
    questao_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'questao',
        key: 'id',
      },
    },
    resposta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'resposta',
        key: 'id',
      },
    },
  },
  {
    tableName: 'respostas_aluno', // Nome correto da tabela
    timestamps: false,
  }
)

export default RespostasAluno
