import pool from "../config/db";

// Estructura del tipo de dato para un préstamo
export interface Prestamo {
  id?: number;
  id_usuario: number;
  id_tipo_prestamo: number;
  monto: number;
  cuotas_total: number;
  fecha_inicio: string;
  estado?: "vigente" | "pendiente" | "cancelado";
}

/**
 * Crea un préstamo y sus cuotas automáticamente
 * @param prestamo - Datos del préstamo
 */
export const crearPrestamoConCuotas = async (prestamo: Prestamo): Promise<void> => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN"); // Comenzamos la transacción

    // Insertamos el préstamo
    const result = await client.query(
      `INSERT INTO prestamos (id_usuario, id_tipo_prestamo, monto, cuotas_total, fecha_inicio)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [
        prestamo.id_usuario,
        prestamo.id_tipo_prestamo,
        prestamo.monto,
        prestamo.cuotas_total,
        prestamo.fecha_inicio,
      ]
    );

    const prestamoId = result.rows[0].id;

    // Calculamos el valor de cada cuota
    const valorCuota = prestamo.monto / prestamo.cuotas_total;

    // Insertamos las cuotas mensuales
    for (let i = 1; i <= prestamo.cuotas_total; i++) {
      const fechaPago = new Date(prestamo.fecha_inicio);
      fechaPago.setMonth(fechaPago.getMonth() + i);

      await client.query(
        `INSERT INTO cuotas (id_prestamo, numero_cuota, valor, estado, fecha_pago)
         VALUES ($1, $2, $3, 'pendiente', $4)`,
        [prestamoId, i, valorCuota, fechaPago]
      );
    }

    await client.query("COMMIT"); // Confirmamos la transacción
  } catch (error) {
    await client.query("ROLLBACK"); // Revertimos si hay error
    throw error;
  } finally {
    client.release(); // Liberamos la conexión
  }
};

/**
 * Consulta todos los préstamos con nombres reales
 */
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
