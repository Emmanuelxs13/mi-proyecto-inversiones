// Socios.tsx
// Página de gestión de socios con datos obtenidos desde una API pública con opción de definir la cantidad de registros, paginación y búsqueda por nombre en el frontend

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SociosTable from "../components/SociosTable";
import { Socio } from "../types/Socio";

const Socios = () => {
  const [socios, setSocios] = useState<Socio[]>([]); // Lista completa de socios
  const [loading, setLoading] = useState(true); // Estado de carga
  const [cantidadSocios, setCantidadSocios] = useState<number>(10); // Número total de socios a traer
  const [paginaActual, setPaginaActual] = useState<number>(1); // Página actual de la paginación
  const [busqueda, setBusqueda] = useState<string>(""); // Valor del input de búsqueda

  const sociosPorPagina = 10; // Cantidad de socios por página

  // Calculamos los socios filtrados por búsqueda de nombre
  const sociosFiltrados = socios.filter((socio) =>
    socio.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Calculamos paginación sobre los socios filtrados
  const indexInicio = (paginaActual - 1) * sociosPorPagina;
  const indexFin = indexInicio + sociosPorPagina;
  const sociosPaginados = sociosFiltrados.slice(indexInicio, indexFin);

  // Fetch al cargar el componente
  useEffect(() => {
    fetchSocios();
  }, []);

  // Carga de datos desde la API pública
  const fetchSocios = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://randomuser.me/api/?results=${cantidadSocios}`);
      const data = await response.json();

      interface RandomUser {
        name: { first: string; last: string };
        email: string;
        phone: string;
        location: { country: string };
        picture: { thumbnail: string };
      }

      const sociosFormateados: Socio[] = data.results.map((user: RandomUser, index: number) => ({
        id: `${index + 1}`,
        nombre: `${user.name.first} ${user.name.last}`,
        correo: user.email,
        telefono: user.phone,
        pais: user.location.country,
        foto: user.picture.thumbnail,
      }));

      setSocios(sociosFormateados);
      setPaginaActual(1);
    } catch (error) {
      console.error("Error al cargar socios:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPaginas = Math.ceil(sociosFiltrados.length / sociosPorPagina);

  // Funciones CRUD básicas
  const verSocio = (socio: Socio) => {
    alert(`Socio: ${socio.nombre}\nEmail: ${socio.correo}\nPaís: ${socio.pais}`);
  };

  const editarSocio = (socio: Socio) => {
    const nuevoNombre = prompt("Editar nombre:", socio.nombre);
    if (nuevoNombre) {
      setSocios((prev) =>
        prev.map((s) => (s.id === socio.id ? { ...s, nombre: nuevoNombre } : s))
      );
    }
  };

  const eliminarSocio = (id: string) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este socio?");
    if (confirmar) {
      setSocios((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const actualizarSocio = (socioEditado: Socio) => {
    setSocios((prevSocios) =>
      prevSocios.map((s) => (s.id === socioEditado.id ? socioEditado : s))
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-12 px-6 max-w-7xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Gestión de Socios</h1>

        {/* Filtro de búsqueda por nombre */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="border px-3 py-1 rounded w-full max-w-sm text-sm"
          />
          {/* 🔎 Para agregar otro criterio de búsqueda, como país, se puede extender esta lógica con más campos e incluirlos en el filtro sociosFiltrados */}
        </div>

        <div className="mb-6">
          <label className="mr-2 text-sm font-medium">Cantidad de socios:</label>
          <input
            type="number"
            value={cantidadSocios}
            min={1}
            max={1000}
            onChange={(e) => setCantidadSocios(Number(e.target.value))}
            className="border rounded px-2 py-1 w-20 text-sm"
          />
          <button
            onClick={fetchSocios}
            className="ml-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Cargar
          </button>
        </div>

        {loading ? (
          <p className="text-gray-600">Cargando socios...</p>
        ) : sociosFiltrados.length > 0 ? (
          <>
            <SociosTable
              socios={sociosPaginados}
              onView={verSocio}
              onEdit={editarSocio}
              onDelete={eliminarSocio}
              onUpdate={actualizarSocio}
            />

            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
                <button
                  key={pagina}
                  onClick={() => setPaginaActual(pagina)}
                  aria-label={`Ir a la página ${pagina}`}
                  title={`Página ${pagina}`}
                  className={`px-3 py-1 border rounded ${
                    paginaActual === pagina
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 border-blue-600"
                  }`}
                >
                  {pagina}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-600">No hay socios disponibles. Ajusta la cantidad o la búsqueda y vuelve a cargar.</p>
        )}
      </section>
    </div>
  );
};

export default Socios;
