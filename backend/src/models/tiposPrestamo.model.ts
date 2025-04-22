// src/models/tiposPrestamo.model.ts

import pool from '../config/db';

// Definimos el tipo para un tipo de préstamo
export interface TipoPrestamo {
  id?: number;
  nombre: string;
}

// Obtener todos los tipos de préstamo
export const obtenerTiposPrestamo = async (): Promise<TipoPrestamo[]> => {
  const result = await pool.query('SELECT * FROM tipos_prestamo');
  return result.rows;
};

// Crear un nuevo tipo de préstamo
export const crearTipoPrestamo = async (tipo: TipoPrestamo): Promise<void> => {
  await pool.query('INSERT INTO tipos_prestamo (nombre) VALUES ($1)', [tipo.nombre]);
};
