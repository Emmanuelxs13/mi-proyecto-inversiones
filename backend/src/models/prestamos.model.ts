import pool from '../config/db';
import { Prestamo } from './types';

/**
 * Crea un préstamo en la base de datos junto con sus cuotas mensuales.
 * @param prestamo Objeto de tipo Prestamo con los datos requeridos
 */
export const crearPrestamoConCuotas = async (prestamo: Prestamo): Promise<void> => {
    const client = await pool.connect();
  
    try {
      await client.query('BEGIN'); // 🟡 Inicia transacción para garantizar integridad
  
      // 1️⃣ Insertar el préstamo y obtener el ID generado
      const result = await client.query(
        `INSERT INTO prestamos (usuario_id, tipo_prestamo_id, monto_total, cuotas_total)
         VALUES ($1, $2, $3, $4) RETURNING id`,
        [
          prestamo.id_usuario,
          prestamo.id_tipo_prestamo,
          prestamo.monto,
          prestamo.cuotas_total,
        ]
      );
  
      const prestamoId = result.rows[0].id;
  
      // 2️⃣ Calcular valor de cada cuota
      const valorCuota = prestamo.monto / prestamo.cuotas_total;
  
      // 3️⃣ Insertar cada cuota mensualmente
      for (let i = 1; i <= prestamo.cuotas_total; i++) {
        const fechaCuota = new Date();
        fechaCuota.setMonth(fechaCuota.getMonth() + i);
  
        await client.query(
          `INSERT INTO cuotas (prestamo_id, numero_cuota, valor, pagada)
           VALUES ($1, $2, $3, FALSE)`,
          [prestamoId, i, valorCuota]
        );
      }
  
      await client.query('COMMIT'); // 🟢 Confirmar transacción si todo va bien
    } catch (error) {
      await client.query('ROLLBACK'); // 🔴 Revertir si algo falla
      throw error; // Reenviar el error al controlador
    } finally {
      client.release(); // ✅ Liberar conexión al pool
    }
  };

export const obtenerPrestamos = async () => {
    const result = await pool.query('SELECT * FROM prestamos ORDER BY id DESC');
    return result.rows;
  };
  