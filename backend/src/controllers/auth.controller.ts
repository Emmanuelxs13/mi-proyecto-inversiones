// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { generateToken } from "../utils/jwt";
import bcrypt from "bcrypt";

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


/**
 * Registro de nuevo usuario
 */
export const register = async (req: Request, res: Response): Promise<Response> => {
  const { nombre, correo, password } = req.body;

  if (!nombre || !correo || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  try {
    const exists = await UserModel.emailExists(correo);
    if (exists) {
      return res.status(409).json({ message: "El correo ya está registrado." });
    }

    const nuevoUsuario = await UserModel.createUser(nombre, correo, password);

    return res.status(201).json({
      message: "Usuario registrado con éxito",
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al registrar usuario", error });
  }
};