// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: number;
  rol: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.status(403).json({ message: "Token no proporcionado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
