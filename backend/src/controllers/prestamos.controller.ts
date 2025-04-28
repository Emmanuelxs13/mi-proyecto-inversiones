// src/controllers/prestamos.controller.ts

import { Request, Response } from "express";
import pool from "../config/db";
import { crearPrestamoConCuotas, obtenerPrestamos } from "../models/prestamos.model";

/**
 * Obtener todos los préstamos (JOIN usuarios y tipos de préstamo)
 */
export const getPrestamos = async (_req: Request, res: Response) => {
  try {
    const prestamos = await obtenerPrestamos();
    console.log("✅ Préstamos encontrados:", prestamos.length);
    res.json(prestamos);
  } catch (error: any) {
    console.error("❌ Error al obtener préstamos:", error.message);
    res.status(500).json({
      error: "Error al obtener préstamos",
      detalle: error.message || "Error desconocido",
    });
  }
};

/**
 * Crear un préstamo simple
 */
export const postPrestamo = async (req: Request, res: Response) => {
  try {
    await crearPrestamoConCuotas(req.body);
    res.status(201).json({ mensaje: "Préstamo creado correctamente" });
  } catch (error) {
    console.error("❌ Error al crear préstamo:", error);
    res.status(500).json({ error: "Error al crear préstamo" });
  }
};

/**
 * Crear préstamo completo (nuevo socio + préstamo + cuotas)
 */
export const postPrestamoCompleto = async (req: Request, res: Response): Promise<Response | void> => {
  const { nombre, correo, telefono, direccion, foto, tipoPrestamo: id_tipo_prestamo, monto, cuotas } = req.body;


  if (!nombre || !telefono || !direccion || id_tipo_prestamo || !monto || !cuotas) {
    return res.status(400).json({ error: "Todos los campos obligatorios deben ser completados." });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Crear socio
    const usuarioRes = await client.query(
      `INSERT INTO usuarios (nombre, correo, telefono, direccion, foto)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [nombre, correo, telefono, direccion, foto]
    );

    const id_usuario = usuarioRes.rows[0].id;

    // Crear préstamo
    const prestamoRes = await await client.query(
      `INSERT INTO prestamos (id_usuario, id_tipo_prestamo, monto, cuotas_total, fecha_inicio)
       VALUES ($1, $2, $3, $4, CURRENT_DATE) RETURNING id`,
      [id_usuario, id_tipo_prestamo, monto, cuotas]
    );

    const prestamoId = prestamoRes.rows[0].id;

    // Crear cuotas
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
    res.status(500).json({
      error: "Error al registrar préstamo completo",
      detalle: error.message || "Error desconocido",
    });
  } finally {
    client.release();
  }
};

/**
 * Editar un préstamo existente
 */
export const putPrestamo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { monto, cuotas_total, id_tipo_prestamo } = req.body;

  try {
    const result = await pool.query(
      `UPDATE prestamos
       SET monto = $1, cuotas_total = $2, id_tipo_prestamo = $3
       WHERE id = $4 RETURNING *`,
      [monto, cuotas_total, id_tipo_prestamo, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Préstamo no encontrado" });
    }

    res.json({ mensaje: "Préstamo actualizado correctamente", data: result.rows[0] });
  } catch (error) {
    console.error("❌ Error al editar préstamo:", error);
    res.status(500).json({ error: "Error al editar préstamo" });
  }
};

/**
 * Eliminar un préstamo
 */
export const deletePrestamo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM prestamos WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Préstamo no encontrado" });
    }

    res.json({ mensaje: "Préstamo eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar préstamo:", error);
    res.status(500).json({ error: "Error al eliminar préstamo" });
  }
};
