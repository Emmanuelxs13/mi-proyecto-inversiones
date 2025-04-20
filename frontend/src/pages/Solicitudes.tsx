// Solicitudes.tsx
// Vista de solicitudes de registro con datos simulados, filtro por estado, acciones (ver, aprobar, rechazar) y contador en el sidebar

import React, { useState } from "react";
import { format } from "date-fns";

// Tipo para representar una solicitud
interface Solicitud {
  id: string;
  nombre: string;
  correo: string;
  telefono: string;
  mensaje: string;
  fecha: string;
  estado: "pendiente" | "aprobada" | "rechazada";
}

// Datos simulados
const solicitudesIniciales: Solicitud[] = [
  {
    id: "1",
    nombre: "Laura Gómez",
    correo: "laura@example.com",
    telefono: "3123456789",
    mensaje: "Estoy interesada en unirme al fondo de empleados.",
    fecha: "2024-05-01",
    estado: "pendiente",
  },
  {
    id: "2",
    nombre: "Carlos Ruiz",
    correo: "carlos@example.com",
    telefono: "3131234567",
    mensaje: "Solicito más información sobre los beneficios.",
    fecha: "2024-05-02",
    estado: "aprobada",
  },
];

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>(solicitudesIniciales);
  const [modal, setModal] = useState<null | Solicitud>(null);
  const [filtro, setFiltro] = useState<string>("todas");

  // Función para filtrar por estado
  const solicitudesFiltradas =
    filtro === "todas"
      ? solicitudes
      : solicitudes.filter((s) => s.estado === filtro);

  // Función para cambiar el estado de una solicitud
  const cambiarEstado = (id: string, nuevoEstado: "aprobada" | "rechazada") => {
    setSolicitudes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, estado: nuevoEstado } : s))
    );
    setModal(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 pt-6 pb-12 lg:pl-64 animate-fade-in">

      <section className="py-12 px-4 max-w-6xl mx-auto animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-700">Solicitudes de Registro</h1>

          {/* Filtro por estado */}
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          >
            <option value="todas">Todas</option>
            <option value="pendiente">Pendientes</option>
            <option value="aprobada">Aprobadas</option>
            <option value="rechazada">Rechazadas</option>
          </select>
        </div>

        {/* Lista de solicitudes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solicitudesFiltradas.map((sol) => (
            <div
              key={sol.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg bg-white"
            >
              <h3 className="font-semibold text-blue-700 text-lg mb-1">
                {sol.nombre}
              </h3>
              <p className="text-sm text-gray-600">{sol.correo}</p>
              <p className="text-sm text-gray-600 mb-2">{sol.telefono}</p>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  sol.estado === "pendiente"
                    ? "bg-yellow-100 text-yellow-700"
                    : sol.estado === "aprobada"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {sol.estado.toUpperCase()}
              </span>
              <button
                onClick={() => setModal(sol)}
                className="block mt-3 text-blue-600 text-sm underline"
              >
                Ver Detalles
              </button>
            </div>
          ))}
        </div>

        {/* Modal de detalles */}
        {modal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
              <h2 className="text-lg font-bold mb-4 text-blue-700">
                Detalles de Solicitud
              </h2>
              <p><strong>Nombre:</strong> {modal.nombre}</p>
              <p><strong>Correo:</strong> {modal.correo}</p>
              <p><strong>Teléfono:</strong> {modal.telefono}</p>
              <p><strong>Mensaje:</strong> {modal.mensaje}</p>
              <p><strong>Fecha:</strong> {format(new Date(modal.fecha), 'yyyy-MM-dd')}</p>

              <div className="mt-4 flex justify-between">
                <button
                  className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={() => cambiarEstado(modal.id, "aprobada")}
                >
                  Aprobar
                </button>
                <button
                  className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => cambiarEstado(modal.id, "rechazada")}
                >
                  Rechazar
                </button>
                <button
                  className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setModal(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Solicitudes;
