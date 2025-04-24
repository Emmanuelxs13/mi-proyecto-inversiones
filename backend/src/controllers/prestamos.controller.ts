import { Request, Response } from "express";
import {
  crearPrestamoConCuotas,
  obtenerPrestamos,
  Prestamo,
} from "../models/prestamos.model";

/**
 * Controlador para obtener todos los préstamos
 */
export const getPrestamos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const prestamos = await obtenerPrestamos();
    res.json(prestamos);
  } catch (error) {
    console.error("Error al obtener préstamos:", error);
    res.status(500).json({ error: "Error al obtener préstamos" });
  }
};

/**
 * Controlador para crear un nuevo préstamo con cuotas
 */
export const postPrestamo = async (req: Request, res: Response): Promise<void> => {
  const nuevoPrestamo: Prestamo = req.body;

  try {
    await crearPrestamoConCuotas(nuevoPrestamo);
    res.status(201).json({ mensaje: "✅ Préstamo creado correctamente con cuotas" });
  } catch (error) {
    console.error("Error al crear préstamo:", error);
    res.status(500).json({ error: "❌ Error al crear préstamo" });
  }
};
