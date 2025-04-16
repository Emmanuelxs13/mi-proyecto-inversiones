// Socios.tsx
// Página de gestión de socios con API pública, paginación y modales personalizados para acciones

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SociosTable from "../components/SociosTable";
import { Socio } from "../types/Socio";

const Socios = () => {
  const [socios, setSocios] = useState<Socio[]>([]);
  const [loading, setLoading] = useState(true);
  const [cantidadSocios, setCantidadSocios] = useState<number>(10);
  const [paginaActual, setPaginaActual] = useState<number>(1);

  const sociosPorPagina = 10;
  const indexInicio = (paginaActual - 1) * sociosPorPagina;
  const indexFin = indexInicio + sociosPorPagina;
  const sociosPaginados = socios.slice(indexInicio, indexFin);

  // Estado para manejar el socio activo para ver/editar/eliminar
  const [socioActivo, setSocioActivo] = useState<Socio | null>(null);
  const [modal, setModal] = useState<"ver" | "editar" | "eliminar" | null>(null);

  useEffect(() => {
    fetchSocios();
  }, []);

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

  // Acción: Ver
  const verSocio = (socio: Socio) => {
    setSocioActivo(socio);
    setModal("ver");
  };

  // Acción: Editar
  const editarSocio = (socio: Socio) => {
    setSocioActivo(socio);
    setModal("editar");
  };

  // Acción: Eliminar
  const eliminarSocio = (id: string) => {
    setSocioActivo(socios.find((s) => s.id === id) || null);
    setModal("eliminar");
  };

  // Confirmar eliminación
  const confirmarEliminar = () => {
    if (socioActivo) {
      setSocios((prev) => prev.filter((s) => s.id !== socioActivo.id));
      cerrarModal();
    }
  };

  // Actualizar datos desde modal editar
  const actualizarSocio = (socioEditado: Socio) => {
    setSocios((prevSocios) =>
      prevSocios.map((s) => (s.id === socioEditado.id ? socioEditado : s))
    );
    cerrarModal();
  };

  // Cerrar cualquier modal
  const cerrarModal = () => {
    setModal(null);
    setSocioActivo(null);
  };

  const totalPaginas = Math.ceil(socios.length / sociosPorPagina);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-12 px-6 max-w-7xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Gestión de Socios</h1>

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
        ) : socios.length > 0 ? (
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
          <p className="text-gray-600">No hay socios disponibles. Ajusta la cantidad y vuelve a cargar.</p>
        )}

        {/* Modal eliminar */}
        {modal === "eliminar" && socioActivo && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm shadow-xl animate-fade-in">
              <h2 className="text-lg font-semibold text-red-600 mb-4">¿Eliminar socio?</h2>
              <p className="mb-4 text-gray-700">Estás a punto de eliminar a <strong>{socioActivo.nombre}</strong>.</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={cerrarModal}
                  className="px-4 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarEliminar}
                  className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Socios;
