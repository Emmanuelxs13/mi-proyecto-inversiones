// getSocios.ts
// Servicio para obtener datos públicos de usuarios desde la API randomuser.me

// Definimos el tipo Socio con los campos esperados
export interface Socio {
    id: number;
    nombre: string;
    cedula: string;
    email: string;
    telefono: string;
    estado: string;
  }
  
  // Función asincrónica que hace la petición y transforma la respuesta
  export const getSocios = async (): Promise<Socio[]> => {
    try {
      // Hacemos una petición a la API pública para obtener 5 usuarios
      const res = await fetch("https://randomuser.me/api/?results=5&nat=us,co");
  
      // Convertimos la respuesta a JSON
      const data = await res.json();
  
      // Transformamos los datos de la API al formato que usamos en el frontend
      return data.results.map((user: any, index: number) => ({
        id: index + 1,
        nombre: `${user.name.first} ${user.name.last}`,
        cedula: user.id.value || `10${Math.floor(Math.random() * 100000000)}`,
        email: user.email,
        telefono: user.phone,
        estado: Math.random() > 0.5 ? "Activo" : "Inactivo"
      }));
    } catch (error) {
      console.error("Error al obtener socios:", error);
      return [];
    }
  };
  