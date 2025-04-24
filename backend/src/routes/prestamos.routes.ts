import { Router } from 'express';
import { getPrestamos, postPrestamo } from '../controllers/prestamos.controller';

const router = Router();

// GET /prestamos
router.get('/', getPrestamos);

// POST /prestamos
router.post('/', postPrestamo);

export default router;
