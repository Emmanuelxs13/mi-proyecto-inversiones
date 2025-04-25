import { Request, Response } from "express";
import pool from "../config/db";

/**
 * Obtener tipos de préstamos disponibles
 */
export const getTiposPrestamo = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT id, nombre FROM tipos_prestamos ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener tipos de préstamo:", error);
    res.status(500).json({ error: "Error al obtener tipos de préstamo" });
  }
};
