import { Afiliacion } from '../models/afiliacion.model';

// Simulación de base de datos
const database: any[] = [
  { id: 1, nombre: 'Juan', apellido: 'Pérez', cedula: '123456', email: 'juan@example.com', telefono: '123456789' },
  { id: 2, nombre: 'María', apellido: 'Gómez', cedula: '654321', email: 'maria@example.com', telefono: '987654321' },
];

// Obtener todas las afiliaciones
export const getAllAfiliaciones = async () => {
  return database;
};

// Obtener una afiliación por ID
export const getAfiliacionById = async (id: number) => {
  return database.find((afiliacion) => afiliacion.id === id);
};

// Crear una nueva afiliación
export const createAfiliacion = async (data: any) => {
  const newAfiliacion = { id: database.length + 1, ...data };
  database.push(newAfiliacion);
  return newAfiliacion;
};

// Actualizar una afiliación
export const updateAfiliacion = async (id: number, data: any) => {
  const index = database.findIndex((afiliacion) => afiliacion.id === id);
  if (index !== -1) {
    database[index] = { ...database[index], ...data };
    return database[index];
  }
  return null;
};

// Eliminar una afiliación
export const deleteAfiliacion = async (id: number) => {
  const index = database.findIndex((afiliacion) => afiliacion.id === id);
  if (index !== -1) {
    database.splice(index, 1);
    return true;
  }
  return false;
};