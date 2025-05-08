// src/types/index.d.ts
import "express";

declare module "express" {
  interface Request {
    user?: {
      id: number;
      rol: string;
    };
  }
}
