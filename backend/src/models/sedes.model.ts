// src/models/sedes.model.ts
import pool from '../config/db';

// Definimos el tipo Sede
export interface Sede {
  id?: number;
  nombre: string;
  ciudad: string;
}

// Obtener todas las sedes
export const obtenerSedes = async (): Promise<Sede[]> => {
  const result = await pool.query('SELECT * FROM sedes');
  return result.rows;
};

// Crear una nueva sede
export const crearSede = async (sede: Sede): Promise<void> => {
  await pool.query(
    'INSERT INTO sedes (nombre, ciudad) VALUES ($1, $2)',
    [sede.nombre, sede.ciudad]
  );
};
