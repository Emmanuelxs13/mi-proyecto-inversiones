import { body } from 'express-validator';

export const validarAfiliacion = [
  body('primer_apellido').notEmpty().withMessage('El primer apellido es obligatorio'),
  body('segundo_apellido').notEmpty().withMessage('El segundo apellido es obligatorio'),
  body('nombres').notEmpty().withMessage('Los nombres son obligatorios'),
  body('numero_documento').notEmpty().withMessage('El número de documento es obligatorio'),
  body('correo').isEmail().withMessage('El correo debe ser válido'),
  body('telefono').notEmpty().withMessage('El teléfono es obligatorio'),
  body('direccion').notEmpty().withMessage('La dirección es obligatoria'),
  body('fecha_afiliacion').notEmpty().withMessage('La fecha de afiliación es obligatoria'),
  body('estado')
    .isIn(['activo', 'inactivo', 'pendiente'])
    .withMessage('El estado debe ser activo, inactivo o pendiente'),
  body('sede_id').isInt().withMessage('La sede debe ser un número'),
];
