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
   * Busca un usuario por correo electrónico usando Sequelize.
   */
  async findByEmail(correo: string): Promise<UserDB | null> {
    const [results] = await sequelize.query<UserDB>(
      "SELECT * FROM usuarios WHERE correo = :correo",
      {
        replacements: { correo },
        type: QueryTypes.SELECT,
      }
    );

    return (results as UserDB) || null;
  },

  /**
   * Compara la contraseña ingresada con la almacenada.
   */
  async verifyPassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, hashedPassword);
  },
};
