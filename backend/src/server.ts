import app from './app';
import dotenv from 'dotenv';
import sequelize from './config/db';

dotenv.config();

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('❌ Error conectando a la base de datos:', error);
});
