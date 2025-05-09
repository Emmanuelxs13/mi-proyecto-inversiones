// src/models/user.model.ts
import sequelize from "../config/db";
import bcrypt from "bcrypt";
import { QueryTypes } from "sequelize";

/**
 * Representa un usuario y funciones relacionadas a base de datos.
 */
export interface UserDB {
  id: number;
  nombre: string;
  correo: string;
  password: string;
  rol: string;
}

export const UserModel = {
  /**
   * Busca un usuario por correo electrónico.
   */
  async findByEmail(correo: string): Promise<UserDB | null> {
    const result = await sequelize.query<UserDB>(
      "SELECT * FROM usuarios WHERE correo = :correo",
      {
        replacements: { correo },
        type: QueryTypes.SELECT,
      }
    );

    const user = Array.isArray(result) && result.length > 0 ? result[0] : null;

    if (user) {
      console.log("[LOGIN] Usuario encontrado:", user.correo);
    } else {
      console.log("[LOGIN] Usuario NO encontrado para:", correo);
    }

    return user;
  },

  /**
   * Verifica si un correo ya está registrado.
   */
  async emailExists(correo: string): Promise<boolean> {
    const result = await sequelize.query<UserDB>(
      "SELECT id FROM usuarios WHERE correo = :correo",
      {
        replacements: { correo },
        type: QueryTypes.SELECT,
      }
    );

    return Array.isArray(result) && result.length > 0;
  },

  /**
   * Crea un nuevo usuario con contraseña hasheada y rol por defecto 'usuario'.
   */
  async createUser(nombre: string, correo: string, password: string): Promise<UserDB> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await sequelize.query<UserDB>(
      `INSERT INTO usuarios (nombre, correo, password, rol)
       VALUES (:nombre, :correo, :password, 'usuario')
       RETURNING *`,
      {
        replacements: { nombre, correo, password: hashedPassword },
        type: QueryTypes.SELECT,
      }
    );

    const newUser = Array.isArray(result) ? result[0] : null;

    if (!newUser) throw new Error("No se pudo crear el usuario");

    return newUser;
  },

  /**
   * Compara la contraseña ingresada con la almacenada.
   */
  async verifyPassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
    console.log("[LOGIN] Comparando contraseñas...");
    console.log("→ Ingresada:", inputPassword);
    console.log("→ En BD:", hashedPassword);
    const result = await bcrypt.compare(inputPassword, hashedPassword);
    console.log("¿Coincide?", result);
    return result;
  },
};
