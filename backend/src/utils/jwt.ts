// src/utils/jwt.ts
import jwt from "jsonwebtoken";

interface Payload {
  id: number;
  rol: string;
}

/**
 * Genera un token JWT con los datos del usuario.
 */
export const generateToken = (payload: Payload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "8h",
  });
};
