import express from 'express';
import cors from 'cors';
import sociosRoutes from './routes/socios.routes';
import sedesRoutes from './routes/sedes.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta raíz
app.get('/', (_req, res) => {
  res.send('API de Fondo de Empleados funcionando ✅');
});

app.use('/api/socios', sociosRoutes); //socios
app.use('/api/sedes', sedesRoutes); //sedes

export default app;
