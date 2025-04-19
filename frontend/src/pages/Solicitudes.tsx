// Solicitudes.tsx
// Página para visualizar solicitudes de registro (versión estática por ahora), con diseño responsive y visualmente optimizado.

import React from "react";
import Navbar from "../components/Navbar";

const solicitudesEjemplo = [
  {
    id: 1,
    nombre: "Camila Rodríguez",
    correo: "camila@example.com",
    telefono: "3101234567",
    mensaje: "Me interesa ser parte del fondo. ¿Cuáles son los requisitos?",
    fecha: "2024-04-12",
  },
  {
    id: 2,
    nombre: "Luis García",
    correo: "luis@example.com",
    telefono: "3009876543",
    mensaje: "Deseo afiliarme para acceder a los créditos educativos.",
    fecha: "2024-04-14",
  },
  {
    id: 3,
    nombre: "Natalia Ríos",
    correo: "natalia@example.com",
    telefono: "3186543210",
    mensaje: "¿Puedo afiliarme si soy contratista externo?",
    fecha: "2024-04-15",
  },
];

const Solicitudes = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="py-16 px-4 max-w-7xl mx-auto animate-fade-in">
        {/* Título principal */}
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Solicitudes de Registro</h1>

        {/* Lista de solicitudes */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solicitudesEjemplo.map((sol) => (
            <div
              key={sol.id}
              className="bg-white border rounded-lg shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-blue-600 mb-2">{sol.nombre}</h2>
                <p className="text-sm text-gray-600 mb-1"><strong>Correo:</strong> {sol.correo}</p>
                <p className="text-sm text-gray-600 mb-1"><strong>Teléfono:</strong> {sol.telefono}</p>
                <p className="text-sm text-gray-600 mb-2"><strong>Fecha:</strong> {sol.fecha}</p>
                <p className="text-sm text-gray-800"><strong>Mensaje:</strong> {sol.mensaje}</p>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                  Aprobar
                </button>
                <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Solicitudes;
