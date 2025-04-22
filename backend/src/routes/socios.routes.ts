import { Router } from 'express';
import {
  getSocios,
  getSocioById,
  postSocio,
  putSocio,
  deleteSocio,
} from '../controllers/socios.controller';

const router = Router();

router.get('/', getSocios);
router.get('/:id', getSocioById);
router.post('/', postSocio);
router.put('/:id', putSocio);
router.delete('/:id', deleteSocio);

export default router;
