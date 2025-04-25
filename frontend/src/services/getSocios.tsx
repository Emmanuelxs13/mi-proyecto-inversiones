// getSocios.tsx
// Servicio para obtener socios desde la API pública randomuser.me
// Devuelve una lista de objetos con la estructura definida en el tipo Socio

import { Socio } from "../types/Socio"; // Importamos el tipo Socio

// Función asincrónica para obtener los socios
export const getSocios = async (cantidad: number = 10): Promise<Socio[]> => {
  try {
    // Llamamos a la API pública de randomuser con la cantidad deseada
    const response = await fetch(`https://randomuser.me/api/?results=${cantidad}`);
    const data = await response.json();

    // Definimos la forma de los datos que recibimos (de randomuser)
    interface RandomUser {
      name: { first: string; last: string };
      email: string;
      phone: string;
      location: { country: string };
      picture: { thumbnail: string };
    }

    // Transformamos los datos al formato Socio
    const sociosFormateados: Socio[] = data.results.map((user: RandomUser, index: number) => ({
      id: `${index + 1}`, // Generamos un ID simple
      nombre: `${user.name.first} ${user.name.last}`, // Unimos nombre y apellido
      correo: user.email, // Correo electrónico
      telefono: user.phone, // Número telefónico
      direccion: user.location.country, // País
      foto: user.picture.thumbnail, // URL de la foto
    }));

    return sociosFormateados; // Devolvemos la lista
  } catch (error) {
    console.error("Error al obtener los socios:", error);
    return []; // En caso de error, devolvemos un arreglo vacío
  }
};
