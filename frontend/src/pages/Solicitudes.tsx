// src/pages/Solicitudes.tsx
// Página para visualizar solicitudes estáticas con opción de ver detalles y exportar a PDF

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Tipo de datos de una solicitud
interface Solicitud {
  id: number;
  nombre: string;
  correo: string;
  mensaje: string;
  fecha: string;
}

// Simulaciones de solicitudes
const solicitudesSimuladas: Solicitud[] = [
  {
    id: 1,
    nombre: "Laura García",
    correo: "laura.garcia@gmail.com",
    mensaje: "Estoy interesada en formar parte del fondo.",
    fecha: "2024-04-18",
  },
  {
    id: 2,
    nombre: "Carlos Ramírez",
    correo: "carlos.ramirez@hotmail.com",
    mensaje: "¿Qué beneficios ofrecen? Me gustaría registrarme.",
    fecha: "2024-04-16",
  },
  {
    id: 3,
    nombre: "Ana Torres",
    correo: "ana.torres@ejemplo.com",
    mensaje: "Quiero postularme. ¿Cuáles son los requisitos?",
    fecha: "2024-04-15",
  },
];

const Solicitudes = () => {
  const [solicitudes] = useState<Solicitud[]>(solicitudesSimuladas);
  const [solicitudActiva, setSolicitudActiva] = useState<Solicitud | null>(null);

  // Función para exportar una solicitud a PDF
  const exportarPDF = (solicitud: Solicitud) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Detalles de la Solicitud", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Campo", "Valor"]],
      body: [
        ["Nombre", solicitud.nombre],
        ["Correo", solicitud.correo],
        ["Fecha", solicitud.fecha],
        ["Mensaje", solicitud.mensaje],
      ],
    });

    doc.save(`solicitud-${solicitud.nombre}.pdf`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-12 px-6 max-w-6xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Solicitudes de Registro</h1>

        {/* Tabla de solicitudes */}
        <div className="overflow-x-auto">
          <table className="min-w-full border divide-y divide-gray-200 text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Nombre</th>
                <th className="px-4 py-2 text-left font-semibold">Correo</th>
                <th className="px-4 py-2 text-left font-semibold">Mensaje</th>
                <th className="px-4 py-2 text-left font-semibold">Fecha</th>
                <th className="px-4 py-2 text-left font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {solicitudes.map((sol) => (
                <tr key={sol.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-800">{sol.nombre}</td>
                  <td className="px-4 py-2 text-gray-600">{sol.correo}</td>
                  <td className="px-4 py-2 text-gray-600 truncate">{sol.mensaje}</td>
                  <td className="px-4 py-2 text-gray-600">{sol.fecha}</td>
                  <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => setSolicitudActiva(sol)}
                      className="px-3 py-1 border rounded text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal para ver detalles */}
        {solicitudActiva && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md animate-fade-in">
              <h2 className="text-lg font-bold text-blue-700 mb-4">Solicitud de {solicitudActiva.nombre}</h2>
              <p><strong>Correo:</strong> {solicitudActiva.correo}</p>
              <p><strong>Fecha:</strong> {solicitudActiva.fecha}</p>
              <p className="mt-2"><strong>Mensaje:</strong></p>
              <p className="text-gray-700 border p-2 mt-1 rounded">{solicitudActiva.mensaje}</p>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setSolicitudActiva(null)}
                  className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => exportarPDF(solicitudActiva)}
                  className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Exportar PDF
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
