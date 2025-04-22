import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta raíz
app.get('/', (_req, res) => {
  res.send('API de Fondo de Empleados funcionando ✅');
});

export default app;
