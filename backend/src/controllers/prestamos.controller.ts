import { Request, Response } from "express";
import pool from "../config/db";
import { crearPrestamoConCuotas, obtenerPrestamos } from "../models/prestamos.model";

/**
 * Obtener todos los préstamos con JOIN
 */
export const getPrestamos = async (_req: Request, res: Response) => {
  try {
    const prestamos = await obtenerPrestamos();
    res.json(prestamos);
  } catch (error) {
    console.error("Error al obtener préstamos:", error);
    res.status(500).json({ error: "Error al obtener préstamos" });
  }
};

/**
 * Crear préstamo básico (sin socio nuevo)
 */
export const postPrestamo = async (req: Request, res: Response) => {
  try {
    await crearPrestamoConCuotas(req.body);
    res.status(201).json({ mensaje: "Préstamo creado correctamente" });
  } catch (error) {
    console.error("Error al crear préstamo:", error);
    res.status(500).json({ error: "Error al crear préstamo" });
  }
};

/**
 * Crear préstamo completo: socio nuevo + préstamo + cuotas
 */
export const postPrestamoCompleto = async (req: Request, res: Response): Promise<Response | void> => {
  console.log("🟡 Datos recibidos:", req.body); // <-- Esto es clave

  const { nombre, correo, telefono, direccion, foto, tipoPrestamo, monto, cuotas } = req.body;

  if (!nombre || !telefono || !direccion || !tipoPrestamo || !monto || !cuotas) {
    return res.status(400).json({ error: "Todos los campos obligatorios deben ser completados." });
  }


  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Crear usuario
    const usuarioRes = await client.query(
      `INSERT INTO usuarios (nombre, correo, telefono, direccion, foto)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [nombre, correo, telefono, direccion, foto]
    );

    const id_usuario = usuarioRes.rows[0].id;

    // Crear préstamo
    const prestamoRes = await client.query(
      `INSERT INTO prestamos (id_usuario, id_tipo_prestamo, monto, cuotas_total, fecha_inicio)
       VALUES ($1, $2, $3, $4, CURRENT_DATE) RETURNING id`,
      [id_usuario, tipoPrestamo, monto, cuotas]
    );

    const prestamoId = prestamoRes.rows[0].id;

    // Calcular y registrar cuotas
    const valorCuota = monto / cuotas;
    for (let i = 1; i <= cuotas; i++) {
      const fechaPago = new Date();
      fechaPago.setMonth(fechaPago.getMonth() + i);

      await client.query(
        `INSERT INTO cuotas (id_prestamo, numero_cuota, valor, fecha_pago)
         VALUES ($1, $2, $3, $4)`,
        [prestamoId, i, valorCuota, fechaPago]
      );
    }

    await client.query("COMMIT");
    res.status(201).json({ mensaje: "Socio y préstamo registrados correctamente" });
  } catch (error: any) {
    await client.query("ROLLBACK");
    console.error("❌ Error en el registro completo:", error);
  
    return res.status(500).json({
      error: "Error al registrar préstamo completo",
      detalle: error.message || "Error desconocido"
    });
  }
}
