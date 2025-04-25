import { Router } from "express";
import { getPrestamos, postPrestamo, postPrestamoCompleto } from "../controllers/prestamos.controller";

const router = Router();

router.get("/", getPrestamos);                       // /api/prestamos
router.post("/", postPrestamo);                      // /api/prestamos
router.post("/crear-prestamo-completo", postPrestamoCompleto); // /api/prestamos/crear-prestamo-completo

export default router;
