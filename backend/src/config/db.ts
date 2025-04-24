// db.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Carga las variables del archivo .env
dotenv.config();

// Crea el pool de conexión a PostgreSQL con las variables de entorno
const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default pool;
