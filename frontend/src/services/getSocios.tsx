export interface Socio {
    id: number;
    nombre: string;
    cedula: string;
    email: string;
    telefono: string;
    estado: string;
  }
  
  // Tipo local solo con los datos que vamos a usar del API
  type RandomUser = {
    name: { first: string; last: string };
    email: string;
    phone: string;
    id: { value: string | null };
  };
  
  export const getSocios = async (): Promise<Socio[]> => {
    try {
      const res = await fetch("https://randomuser.me/api/?results=5&nat=us,co");
      const data = await res.json();
  
      // Aplicamos el tipo RandomUser para mayor control y sin usar 'any'
      return data.results.map((user: RandomUser, index: number) => ({
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
  