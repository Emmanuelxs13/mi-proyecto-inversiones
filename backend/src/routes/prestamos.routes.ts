import { Router } from "express";
import { getPrestamos, postPrestamo } from "../controllers/prestamos.controller";

const router = Router();

router.get("/", getPrestamos);
router.post("/", postPrestamo);

export default router;
