// src/controllers/tiposPrestamo.controller.ts

import { Request, Response } from 'express';
import {
  obtenerTiposPrestamo,
  crearTipoPrestamo,
  TipoPrestamo,
} from '../models/tiposPrestamo.model';

// Obtener todos los tipos de préstamo
export const getTiposPrestamo = async (_req: Request, res: Response) => {
  try {
    const tipos = await obtenerTiposPrestamo();
    res.json(tipos);
  } catch (error) {
    console.error('Error al obtener tipos de préstamo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo tipo de préstamo
export const postTipoPrestamo = async (req: Request, res: Response) => {
  const nuevoTipo: TipoPrestamo = req.body;

  try {
    await crearTipoPrestamo(nuevoTipo);
    res.status(201).json({ mensaje: 'Tipo de préstamo creado correctamente' });
  } catch (error) {
    console.error('Error al crear tipo de préstamo:', error);
    res.status(500).json({ error: 'Error al crear tipo de préstamo' });
  }
};
