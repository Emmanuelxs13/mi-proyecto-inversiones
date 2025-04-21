// src/app.ts
import express from 'express';
import cors from 'cors';
import sociosRoutes from './routes/socios.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/socios', sociosRoutes);

export default app;
