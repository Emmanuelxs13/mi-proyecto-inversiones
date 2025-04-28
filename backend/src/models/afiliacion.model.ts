import { Sequelize, DataTypes } from 'sequelize';

// Suponiendo que ya tienes la conexión a PostgreSQL configurada
const sequelize = new Sequelize('postgres://user:password@localhost:5432/mydb');

// Definimos el modelo
const Affiliation = sequelize.define('Affiliation', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  puesto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  archivo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Affiliation;
