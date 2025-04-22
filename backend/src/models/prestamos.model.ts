import pool from "../config/db";

// Estructura de un préstamo
export interface Prestamo {
  id?: number;
  usuario_id: number;
  tipo_prestamo_id: number;
  monto_total: number;
  cuotas_total: number;
  cuotas_pagadas?: number;
}

// Obtener todos los préstamos
export const obtenerPrestamos = async () => {
  const result = await pool.query("SELECT * FROM prestamos");
  return result.rows;
};

// Crear un préstamo
export const crearPrestamo = async (prestamo: Prestamo) => {
  const { usuario_id, tipo_prestamo_id, monto_total, cuotas_total } = prestamo;

  await pool.query(
    `INSERT INTO prestamos (usuario_id, tipo_prestamo_id, monto_total, cuotas_total)
     VALUES ($1, $2, $3, $4)`,
    [usuario_id, tipo_prestamo_id, monto_total, cuotas_total]
  );
};
