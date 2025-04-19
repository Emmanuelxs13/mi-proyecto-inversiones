import React, { useState } from "react";
import { Solicitud } from "../types/Solicitud";
import jsPDF from "jspdf";

// Props del componente
interface Props {
  solicitudes: Solicitud[];
}

const SolicitudesTable: React.FC<Props> = ({ solicitudes }) => {
  const [modoTarjetas, setModoTarjetas] = useState(true);
  const [modalSolicitud, setModalSolicitud] = useState<Solicitud | null>(null);

  // Exportar solicitud individual a PDF
  const exportarPDF = (solicitud: Solicitud) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Solicitud de Registro", 14, 20);
    doc.setFontSize(12);

    const detalles = [
      `Nombre: ${solicitud.nombre}`,
      `Correo: ${solicitud.correo}`,
      `Teléfono: ${solicitud.telefono}`,
      `Mensaje: ${solicitud.mensaje}`,
      `Fecha: ${new Date(solicitud.fecha).toLocaleDateString()}`,
    ];

    detalles.forEach((linea, index) => {
      doc.text(linea, 14, 40 + index * 10);
    });

    doc.save(`solicitud-${solicitud.nombre}.pdf`);
  };

  // Simular aprobación
  const aprobarSolicitud = (solicitud: Solicitud) => {
    alert(`✅ Solicitud de ${solicitud.nombre} aprobada (simulado).`);
    setModalSolicitud(null);
  };

  // Simular rechazo
  const rechazarSolicitud = (solicitud: Solicitud) => {
    alert(`❌ Solicitud de ${solicitud.nombre} rechazada (simulado).`);
    setModalSolicitud(null);
  };

  return (
    <div>
      {/* Botón para cambiar de vista */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setModoTarjetas(!modoTarjetas)}
          className="text-sm px-4 py-2 border rounded text-blue-600 border-blue-600 hover:bg-blue-50"
        >
          Ver como {modoTarjetas ? "Tabla" : "Tarjetas"}
        </button>
      </div>

      {/* Vista tarjetas */}
      {modoTarjetas ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solicitudes.map((sol) => (
            <div key={sol.id} className="bg-white border rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">{sol.nombre}</h3>
              <p className="text-sm text-gray-600"><strong>Correo:</strong> {sol.correo}</p>
              <p className="text-sm text-gray-600"><strong>Teléfono:</strong> {sol.telefono}</p>
              <p className="text-sm text-gray-600"><strong>Mensaje:</strong> {sol.mensaje}</p>
              <p className="text-sm text-gray-500 mt-2"><strong>Fecha:</strong> {new Date(sol.fecha).toLocaleDateString()}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setModalSolicitud(sol)}
                  className="text-sm px-3 py-1 border rounded text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  Ver
                </button>
                <button
                  onClick={() => exportarPDF(sol)}
                  className="text-sm px-3 py-1 border rounded text-green-600 border-green-600 hover:bg-green-50"
                >
                  Exportar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Vista tabla
        <div className="overflow-x-auto">
          <table className="min-w-full border divide-y divide-gray-200 text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Nombre</th>
                <th className="px-4 py-2 text-left font-semibold">Correo</th>
                <th className="px-4 py-2 text-left font-semibold">Teléfono</th>
                <th className="px-4 py-2 text-left font-semibold">Fecha</th>
                <th className="px-4 py-2 text-left font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {solicitudes.map((sol) => (
                <tr key={sol.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{sol.nombre}</td>
                  <td className="px-4 py-2">{sol.correo}</td>
                  <td className="px-4 py-2">{sol.telefono}</td>
                  <td className="px-4 py-2">{new Date(sol.fecha).toLocaleDateString()}</td>
                  <td className="px-4 py-2 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => setModalSolicitud(sol)}
                      className="px-3 py-1 border rounded text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => exportarPDF(sol)}
                      className="px-3 py-1 border rounded text-green-600 border-green-600 hover:bg-green-50"
                    >
                      Exportar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de detalle */}
      {modalSolicitud && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md shadow-xl animate-fade-in">
            <h2 className="text-lg font-semibold text-blue-700 mb-4">Detalles de Solicitud</h2>
            <p><strong>Nombre:</strong> {modalSolicitud.nombre}</p>
            <p><strong>Correo:</strong> {modalSolicitud.correo}</p>
            <p><strong>Teléfono:</strong> {modalSolicitud.telefono}</p>
            <p><strong>Mensaje:</strong> {modalSolicitud.mensaje}</p>
            <p className="text-sm text-gray-500 mt-2"><strong>Fecha:</strong> {new Date(modalSolicitud.fecha).toLocaleDateString()}</p>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => aprobarSolicitud(modalSolicitud)}
                className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Aprobar
              </button>
              <button
                onClick={() => rechazarSolicitud(modalSolicitud)}
                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Rechazar
              </button>
              <button
                onClick={() => setModalSolicitud(null)}
                className="px-4 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolicitudesTable;
