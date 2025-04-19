// SolicitudesTable.tsx
// Componente que permite ver las solicitudes recibidas en formato de tarjetas o tabla (alternable)

import React, { useState } from "react";
import { Solicitud } from "../types/Solicitud";

interface Props {
  solicitudes: Solicitud[];
}

const SolicitudesTable: React.FC<Props> = ({ solicitudes }) => {
  const [modoTarjetas, setModoTarjetas] = useState(true); // Estado para alternar entre vista de tarjetas o tabla

  return (
    <div>
      {/* Botón para cambiar de vista */}
      <div className="mb-4 flex justify-start">
        <button
          onClick={() => setModoTarjetas(!modoTarjetas)}
          className="text-sm px-4 py-2 border rounded text-blue-600 border-blue-600 hover:bg-blue-50"
        >
          Ver como {modoTarjetas ? "Tabla" : "Tarjetas"}
        </button>
      </div>

      {/* Vista tipo tarjeta */}
      {modoTarjetas ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solicitudes.map((solicitud) => (
            <div
              key={solicitud.id}
              className="bg-white border rounded-lg shadow p-4 transition hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-blue-700 mb-2">{solicitud.nombre}</h3>
              <p className="text-sm text-gray-600"><strong>Correo:</strong> {solicitud.correo}</p>
              <p className="text-sm text-gray-600"><strong>Teléfono:</strong> {solicitud.telefono}</p>
              <p className="text-sm text-gray-600"><strong>Mensaje:</strong> {solicitud.mensaje}</p>
              <p className="text-sm text-gray-500 mt-2"><strong>Fecha:</strong> {new Date(solicitud.fecha).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        // Vista tipo tabla
        <div className="overflow-x-auto">
          <table className="min-w-full border divide-y divide-gray-200 text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Nombre</th>
                <th className="px-4 py-2 text-left font-semibold">Correo</th>
                <th className="px-4 py-2 text-left font-semibold">Teléfono</th>
                <th className="px-4 py-2 text-left font-semibold">Mensaje</th>
                <th className="px-4 py-2 text-left font-semibold">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {solicitudes.map((solicitud) => (
                <tr key={solicitud.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{solicitud.nombre}</td>
                  <td className="px-4 py-2">{solicitud.correo}</td>
                  <td className="px-4 py-2">{solicitud.telefono}</td>
                  <td className="px-4 py-2">{solicitud.mensaje}</td>
                  <td className="px-4 py-2">{new Date(solicitud.fecha).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SolicitudesTable;
