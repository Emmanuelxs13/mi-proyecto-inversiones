// src/models/socios.model.ts
import pool from '../config/db';

export interface Socio {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
}

export const obtenerSocios = async (): Promise<Socio[]> => {
  const result = await pool.query('SELECT * FROM socios');
  return result.rows;
};

export const crearSocio = async (socio: Omit<Socio, 'id'>): Promise<Socio> => {
  const { nombre, correo, telefono } = socio;
  const result = await pool.query(
    'INSERT INTO socios (nombre, correo, telefono) VALUES ($1, $2, $3) RETURNING *',
    [nombre, correo, telefono]
  );
  return result.rows[0];
};
