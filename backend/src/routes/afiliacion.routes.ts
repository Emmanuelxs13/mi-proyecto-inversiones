import { Router } from 'express';
import * as controller from '../controllers/afiliaciones.controller';
// import { body } from 'express-validator'; // Elimina validationResult


const router = Router();

// const validarAfiliacion = [
//   body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
//   body('apellido').notEmpty().withMessage('El apellido es obligatorio'),
//   body('cedula').notEmpty().withMessage('La cédula es obligatoria'),
//   body('email').isEmail().withMessage('Debe ser un email válido'),
//   body('telefono').notEmpty().withMessage('El teléfono es obligatorio')
// ];

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;
