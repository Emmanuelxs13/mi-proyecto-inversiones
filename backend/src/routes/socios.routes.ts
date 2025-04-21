// src/routes/socios.routes.ts Aquí registro los endpoints
import { Router } from 'express';
import { getSocios, postSocio } from '../controllers/socios.controller';

const router = Router();

router.get('/', getSocios);
router.post('/', postSocio);

export default router;
