// src/routes/auth.routes.ts
import { Router } from "express";
import { login, register } from "../controllers/auth.controller";

const router = Router();

/**
 * Ruta de login para autenticación de usuarios.
 */
router.post("/login", login);
router.post("/register", register);


export default router;
