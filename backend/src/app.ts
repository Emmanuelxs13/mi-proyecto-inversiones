// src/app.ts

import express from "express";
import cors from "cors";

// Rutas
import sociosRoutes from "./routes/socios.routes";
import sedesRoutes from "./routes/sedes.routes";
import prestamosRoutes from "./routes/prestamos.routes";
import tiposPrestamoRoutes from "./routes/tiposPrestamo.routes";
import afiliacionRoutes from "./routes/afiliacion.routes";
import authRoutes from "./routes/auth.routes";

const app = express();
const PORT = process.env.PORT || 3000;

// 🛡️ Middlewares
app.use(cors());
app.use(express.json());



// 🏁 Ruta de prueba
app.get("/", (_req, res) => {
  res.send("API de Fondo de Empleados funcionando ✅");
});

// 📦 Rutas agrupadas por módulo
app.use("/api/auth", authRoutes);
app.use("/api/socios", sociosRoutes);
app.use("/api/sedes", sedesRoutes);
app.use("/api/prestamos", prestamosRoutes);
app.use("/api/tipos-prestamos", tiposPrestamoRoutes);
app.use("/api/afiliaciones", afiliacionRoutes);

// Exportar la app para ser utilizada por index.ts
export default app;
