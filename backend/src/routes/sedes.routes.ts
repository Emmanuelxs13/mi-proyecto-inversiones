// src/routes/sedes.routes.ts
import { Router } from 'express';
import { getSedes, postSede } from '../controllers/sedes.controller';

const router = Router();

router.get('/', getSedes);
router.post('/', postSede);

export default router;
