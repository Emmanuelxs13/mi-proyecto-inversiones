import { Router } from "express";
import { getTiposPrestamo } from "../controllers/tiposPrestamo.controller";

const router = Router();
router.get("/", getTiposPrestamo); // /api/tipos-prestamos

export default router;
