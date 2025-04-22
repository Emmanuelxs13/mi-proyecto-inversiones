// src/controllers/sedes.controller.ts
import { Request, Response } from 'express';
import { obtenerSedes, crearSede, Sede } from '../models/sedes.model';

// Obtener todas las sedes
export const getSedes = async (_req: Request, res: Response) => {
  try {
    const sedes = await obtenerSedes();
    res.json(sedes);
  } catch (error) {
    console.error('Error al obtener sedes:', error);
    res.status(500).json({ error: 'Error al obtener sedes' });
  }
};

// Crear una nueva sede
export const postSede = async (req: Request, res: Response) => {
  const nuevaSede: Sede = req.body;

  try {
    await crearSede(nuevaSede);
    res.status(201).json({ mensaje: 'Sede creada correctamente' });
  } catch (error) {
    console.error('Error al crear sede:', error);
    res.status(500).json({ error: 'Error al crear sede' });
  }
};
