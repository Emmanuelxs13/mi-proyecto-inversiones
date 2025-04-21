// src/controllers/socios.controller.ts Este archivo maneja las peticiones HTTP
import { Request, Response } from 'express';
import { obtenerSocios, crearSocio } from '../models/socios.model';

export const getSocios = async (req: Request, res: Response) => {
  try {
    const socios = await obtenerSocios();
    res.json(socios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener socios' });
  }
};

export const postSocio = async (req: Request, res: Response) => {
  try {
    const nuevoSocio = await crearSocio(req.body);
    res.status(201).json(nuevoSocio);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear socio' });
  }
};
