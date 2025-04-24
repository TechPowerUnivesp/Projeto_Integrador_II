import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const Professor = sequelize.define(
  'professor',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'professor',
    timestamps: false, // Desativa os timestamps automáticos
  }
)

export default Professor
