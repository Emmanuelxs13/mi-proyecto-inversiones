import { Request, Response } from "express";
import {
  obtenerPrestamos,
  crearPrestamo,
  Prestamo,
} from "../models/prestamos.model";

// Obtener todos los préstamos
export const getPrestamos = async (_req: Request, res: Response) => {
  try {
    const prestamos = await obtenerPrestamos();
    res.json(prestamos);
  } catch (error) {
    console.error("Error al obtener préstamos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Crear un préstamo
export const postPrestamo = async (req: Request, res: Response) => {
  const nuevoPrestamo: Prestamo = req.body;

  try {
    await crearPrestamo(nuevoPrestamo);
    res.status(201).json({ mensaje: "Préstamo creado correctamente" });
  } catch (error) {
    console.error("Error al crear préstamo:", error);
    res.status(500).json({ error: "Error al crear préstamo" });
  }
};
