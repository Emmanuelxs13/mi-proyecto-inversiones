// src/config/db.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Creamos la instancia de Sequelize con los datos del archivo .env
const sequelize = new Sequelize(
  process.env.DB_NAME || 'fondo_db',
  process.env.DB_USER || 'fondo_user',
  process.env.DB_PASSWORD || 'fondo_password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false, // lo puedes poner en true para debug
  }
);

export default sequelize;
