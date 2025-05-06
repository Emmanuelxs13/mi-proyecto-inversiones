import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as afiliacionService from '../services/afiliaciones.service';

// Obtener todas las afiliaciones
export const getAll = async (_: Request, res: Response) => {
  try {
    const data = await afiliacionService.getAllAfiliaciones();
    res.json(data);
  } catch (error) {
    console.error('Error al obtener afiliaciones:', error);
    res.status(500).json({ message: 'Error al obtener afiliaciones' });
  }
};

// Obtener una afiliación por ID
export const getById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const data = await afiliacionService.getAfiliacionById(id);
    if (data) res.json(data);
    else res.status(404).json({ message: 'Afiliación no encontrada' });
  } catch (error) {
    console.error('Error al buscar afiliación:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Crear una nueva afiliación
export const create = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si hay errores de validación, responder con 400
    res.status(400).json({ errors: errors.array() });
    return
  }

  try {
    const nuevaAfiliacion = await afiliacionService.createAfiliacion(req.body);
    res.status(201).json(nuevaAfiliacion);
  } catch (error) {
    console.error('Error al crear afiliación:', error);
    res.status(500).json({ message: 'Error al crear afiliación' });
  }
};

// Actualizar una afiliación
export const update = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const data = await afiliacionService.updateAfiliacion(id, req.body);
    if (data) res.json(data);
    else res.status(404).json({ message: 'Afiliación no encontrada' });
  } catch (error) {
    console.error('Error al actualizar afiliación:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar una afiliación
export const remove = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const success = await afiliacionService.deleteAfiliacion(id);
    if (success) res.status(204).send();
    else res.status(404).json({ message: 'Afiliación no encontrada' });
  } catch (error) {
    console.error('Error al eliminar afiliación:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
