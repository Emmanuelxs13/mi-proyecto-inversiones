// Solicitudes.tsx
// Página de gestión de solicitudes con tabla, exportación y navegación

import React from "react";
import SolicitudesTable from "../components/SolicitudesTable";
import { exportSolicitudesToPDF, exportSolicitudesToCSV } from "../utils/ExportSolicitudesUtils";
import { Solicitud } from "../types/Solicitud";

// Datos estáticos simulados (estos se integrarán con backend más adelante)
const solicitudesSimuladas: Solicitud[] = [
  {
    id: "1",
    nombre: "Carlos Pérez",
    correo: "carlos.perez@email.com",
    telefono: "3001234567",
    mensaje: "Estoy interesado en ser socio del fondo",
    fecha: "2025-04-18",
  },
  {
    id: "2",
    nombre: "María López",
    correo: "maria.lopez@email.com",
    telefono: "3019876543",
    mensaje: "Quisiera postularme como socia",
    fecha: "2025-04-17",
  },
];

const Solicitudes = () => {
  return (
    <div className="mmin-h-screen p-6 bg-white animate-fade-in pl-48 pr-4 py-6 ml-6">

      <section className="py-12 px-6 max-w-7xl mx-auto animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Solicitudes Recibidas</h1>

        </div>

        <SolicitudesTable solicitudes={solicitudesSimuladas} />
          {/* Botones de exportación */}
          <div className="flex gap-2 mt-16">
            <button
              onClick={() => exportSolicitudesToPDF(solicitudesSimuladas)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
            >
              Exportar PDF
            </button>
            <button
              onClick={() => exportSolicitudesToCSV(solicitudesSimuladas)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
            >
              Exportar CSV
            </button>
          </div>
      </section>
    </div>
  );
};

export default Solicitudes;
