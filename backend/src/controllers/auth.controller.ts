// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { generateToken } from "../utils/jwt";

/**
 * Controlador de login. Valida credenciales y retorna un token JWT si son válidas.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  const { correo, password } = req.body;

  try {
    const user = await UserModel.findByEmail(correo);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    const validPassword = await UserModel.verifyPassword(password, user.password);
    if (!validPassword) {
      res.status(401).json({ message: "Contraseña incorrecta" });
      return;
    }

    const token = generateToken({ id: user.id, rol: user.rol });

    res.json({
      token,
      user: { id: user.id, nombre: user.nombre, correo: user.correo, rol: user.rol },
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};
