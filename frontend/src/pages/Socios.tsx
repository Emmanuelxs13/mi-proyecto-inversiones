// Socios.tsx
// Página de gestión de socios con datos obtenidos desde una API pública

import React, { useEffect, useState } from "react";

// Importamos el componente Navbar
import Navbar from "../components/Navbar";

// Importamos la tabla que muestra la lista de socios
import SociosTable from "../components/SociosTable";

// Importamos el servicio y el tipo de datos
import { getSocios, Socio } from "../services/getSocios";

const Socios = () => {
  // Estado para almacenar los socios que se cargarán desde la API
  const [socios, setSocios] = useState<Socio[]>([]);

  // Estado para saber si estamos en proceso de carga
  const [loading, setLoading] = useState(true);

  // useEffect se ejecuta una sola vez cuando el componente se monta
  useEffect(() => {
    // Función asincrónica que llama al servicio getSocios()
    const fetchSocios = async () => {
      const data = await getSocios(); // Traemos los datos desde la API
      setSocios(data);                // Actualizamos el estado con los datos
      setLoading(false);             // Ya no estamos cargando
    };

    fetchSocios(); // Ejecutamos la función al cargar la página
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Barra de navegación superior */}
      <Navbar />

      {/* Contenido principal */}
      <section className="py-12 px-6 max-w-7xl mx-auto animate-fade-in">
        {/* Título principal */}
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Gestión de Socios</h1>

        {/* Si aún estamos cargando, mostramos mensaje */}
        {loading ? (
          <p className="text-gray-600">Cargando socios...</p>
        ) : (
          // Cuando los datos están listos, mostramos la tabla
          <SociosTable socios={socios} />
        )}
      </section>
    </div>
  );
};

export default Socios;
