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
// Obtener todos los préstamos con nombre del usuario y tipo de préstamo
export const obtenerPrestamos = async () => {
  const result = await pool.query(`
    SELECT 
      p.id,
      p.id_usuario,
      u.nombre AS nombre_usuario,
      p.id_tipo_prestamo,
      tp.nombre AS tipo_prestamo,
      p.monto,
      p.cuotas_total,
      p.fecha_inicio,
      p.estado
    FROM prestamos p
    JOIN usuarios u ON p.id_usuario = u.id
    JOIN tipos_prestamos tp ON p.id_tipo_prestamo = tp.id
    ORDER BY p.id DESC
  `);
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
