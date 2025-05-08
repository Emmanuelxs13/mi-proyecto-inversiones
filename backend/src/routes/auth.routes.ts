// src/routes/auth.routes.ts
import { Router } from "express";
import { login } from "../controllers/auth.controller";

const router = Router();

/**
 * Ruta de login para autenticación de usuarios.
 */
router.post("/login", login);

export default router;
