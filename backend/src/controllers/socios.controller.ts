// src/controllers/socios.controller.ts
// Controladores para gestionar las operaciones CRUD de socios

// Importamos los tipos y funciones desde el modelo de socios
import {
    obtenerSocios,
    obtenerSocioPorId,
    crearSocio,
    actualizarSocio,
    eliminarSocio,
    Socio,
  } from '../models/socios.model';
  
  // Importamos el objeto Request y Response de Express para tipar adecuadamente
  import { Request, Response } from 'express';
  
  /**
   * GET /api/socios
   * Controlador para obtener todos los socios
   */
  export const getSocios = async (_req: Request, res: Response): Promise<void> => {
    try {
      const socios = await obtenerSocios();
      res.json(socios);
    } catch (error) {
      console.error('Error al obtener socios:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  /**
   * GET /api/socios/:id
   * Controlador para obtener un socio por su ID
   */
  export const getSocioById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id); // Convertimos el ID a entero
  
    try {
      const socio = await obtenerSocioPorId(id);
  
      if (!socio) {
        res.status(404).json({ error: 'Socio no encontrado' });
        return;
      }
  
      res.json(socio);
    } catch (error) {
      console.error(`Error al obtener socio con ID ${id}:`, error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  /**
   * POST /api/socios
   * Controlador para crear un nuevo socio
   */
  export const postSocio = async (req: Request, res: Response): Promise<void> => {
    const nuevoSocio: Socio = req.body;
  
    try {
      await crearSocio(nuevoSocio);
      res.status(201).json({ mensaje: 'Socio creado correctamente' });
    } catch (error) {
      console.error('Error al crear socio:', error);
      res.status(500).json({ error: 'Error al crear socio' });
    }
  };
  
  /**
   * PUT /api/socios/:id
   * Controlador para actualizar un socio existente
   */
  export const putSocio = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const datosActualizados: Socio = req.body;
  
    try {
      await actualizarSocio(id, datosActualizados);
      res.json({ mensaje: 'Socio actualizado correctamente' });
    } catch (error) {
      console.error(`Error al actualizar socio con ID ${id}:`, error);
      res.status(500).json({ error: 'Error al actualizar socio' });
    }
  };
  
  /**
   * DELETE /api/socios/:id
   * Controlador para eliminar un socio
   */
  export const deleteSocio = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
  
    try {
      await eliminarSocio(id);
      res.json({ mensaje: 'Socio eliminado correctamente' });
    } catch (error) {
      console.error(`Error al eliminar socio con ID ${id}:`, error);
      res.status(500).json({ error: 'Error al eliminar socio' });
    }
  };
  