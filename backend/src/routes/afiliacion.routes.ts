// Importamos las librerías necesarias
import express, { Request, Response } from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer'; // Import correcto de nodemailer
import Affiliation from '../models/afiliacion.model'; // Importamos el modelo de afiliación

// Configuración de Multer para guardar archivos en el servidor
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Definimos el directorio donde se guardarán los archivos
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    // Definimos el nombre del archivo en el servidor (evitamos colisiones)
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Inicializamos multer con la configuración anterior
const upload = multer({ storage });

// Creamos una nueva instancia del router de Express
const router = express.Router();

/**
 * Ruta para postular un nuevo empleado
 * Recibe nombre, email, puesto y un archivo adjunto
 */
router.post('/postular', upload.single('archivo'), async (req: Request, res: Response): Promise<void> => {
  // Extraemos los campos del cuerpo de la solicitud
  const { nombre, email, puesto } = req.body;
  const archivo = req.file;

  // Validamos que todos los campos estén presentes
  if (!nombre || !email || !puesto || !archivo) {
    res.status(400).send('Todos los campos son requeridos');
    return;
  }

  try {
    // Guardamos la información de la postulación en la base de datos
    const newAffiliation = await Affiliation.create({
      nombre,
      email,
      puesto,
      archivo: archivo.filename, // Guardamos el nombre del archivo subido
    });

    // Configuramos el servicio de correo usando Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Usamos Gmail como proveedor de SMTP
      auth: {
        user: 'tu-correo@gmail.com', // Cambiar a correo real
        pass: 'tu-contraseña',        // Cambiar a contraseña real o usar variables de entorno
      },
    });

    // Definimos las opciones del correo
    const mailOptions = {
      from: 'tu-correo@gmail.com', // Correo remitente
      to: email,                   // Correo destinatario
      subject: 'Confirmación de Postulación',
      text: 'Tu postulación ha sido recibida y está en revisión.',
    };

    // Enviamos el correo
    transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
      if (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).send('Error al enviar el correo');
        return;
      }
      console.log('Correo enviado:', info.response);
      res.status(200).send('Postulación enviada y correo enviado');
    });
  } catch (error) {
    console.error('Error al procesar la postulación:', error);
    res.status(500).send('Error al guardar la postulación');
  }
});

// Exportamos el router para usarlo en el servidor principal
export default router;
