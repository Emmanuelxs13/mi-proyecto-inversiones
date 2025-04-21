// Importamos el pool de conexión a PostgreSQL desde la configuración central
import pool from '../config/db';

// Tipado TypeScript para un socio (usuario)
export interface Socio {
  id?: number; // El ID es opcional porque lo genera la base de datos
  nombre_completo: string;
  cedula: string;
  correo: string;
  sede_id: number;
}

// Función para obtener todos los socios (usuarios)
export const obtenerSocios = async (): Promise<Socio[]> => {
  const result = await pool.query('SELECT * FROM usuarios');
  return result.rows;
};

// Función para obtener un socio específico por su ID
export const obtenerSocioPorId = async (id: number): Promise<Socio | null> => {
  const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
  return result.rows[0] || null;
};

// Función para crear un nuevo socio (usuario)
export const crearSocio = async (socio: Socio): Promise<void> => {
  const { nombre_completo, cedula, correo, sede_id } = socio;
  await pool.query(
    'INSERT INTO usuarios (nombre_completo, cedula, correo, sede_id) VALUES ($1, $2, $3, $4)',
    [nombre_completo, cedula, correo, sede_id]
  );
};

// Función para actualizar un socio existente
export const actualizarSocio = async (id: number, socio: Socio): Promise<void> => {
  const { nombre_completo, cedula, correo, sede_id } = socio;
  await pool.query(
    'UPDATE usuarios SET nombre_completo = $1, cedula = $2, correo = $3, sede_id = $4 WHERE id = $5',
    [nombre_completo, cedula, correo, sede_id, id]
  );
};

// Función para eliminar un socio por su ID
export const eliminarSocio = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
};
