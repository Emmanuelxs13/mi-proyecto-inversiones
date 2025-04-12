import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/', (_req, res) => {
  res.send('HOLAAA');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
