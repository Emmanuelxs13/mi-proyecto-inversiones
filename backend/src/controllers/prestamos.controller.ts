import { Request, Response } from 'express';
import { crearPrestamoConCuotas } from '../models/prestamos.model';
import { Prestamo } from '../models/types';
import { obtenerPrestamos } from '../models/prestamos.model'; // 🔁 Asegúrate de tener esta función en el modelo

/**
 * GET /prestamos
 * Controlador que obtiene todos los préstamos registrados en la base de datos.
 */
export const getPrestamos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const prestamos = await obtenerPrestamos(); // Llama a la función del modelo
    res.json(prestamos); // Devuelve los préstamos en formato JSON
  } catch (error) {
    console.error('Error al obtener préstamos:', error);
    res.status(500).json({ error: 'Error al obtener préstamos' });
  }
};

/**
 * POST /prestamos
 * Crea un préstamo y genera automáticamente las cuotas.
 */
export const postPrestamo = async (req: Request, res: Response): Promise<void> => {
  const nuevoPrestamo: Prestamo = req.body;

  try {
    await crearPrestamoConCuotas(nuevoPrestamo);
    res.status(201).json({ mensaje: 'Préstamo y cuotas creados correctamente' });
  } catch (error) {
    console.error('Error al crear préstamo:', error);
    res.status(500).json({ error: 'Error al crear préstamo' });
  }
};
