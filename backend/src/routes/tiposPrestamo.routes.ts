// src/routes/tiposPrestamo.routes.ts

import { Router } from 'express';
import {
  getTiposPrestamo,
  postTipoPrestamo,
} from '../controllers/tiposPrestamo.controller';

const router = Router();

router.get('/', getTiposPrestamo);
router.post('/', postTipoPrestamo);

export default router;
