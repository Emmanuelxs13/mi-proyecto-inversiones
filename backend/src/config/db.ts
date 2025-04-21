// src/config/db.ts
// Este archivo configura la conexión a PostgreSQL usando las variables de entorno

import { Pool } from "pg";
import dotenv from "dotenv";

// Cargamos las variables del archivo .env
dotenv.config();

// Creamos una nueva instancia de Pool con los valores desde .env
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});

export default pool;
