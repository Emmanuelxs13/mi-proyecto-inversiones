
// Página de historial de simulaciones con exportación a PDF y CSV

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { exportHistorialToPDF, exportHistorialToCSV } from "../utils/ExportUtils";
import { Simulacion } from "../types/Simulacion"; // Asegúrate que la ruta sea correcta

const formatoPesos = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 2,
});

const historialInicial: Simulacion[] = [
  {
    id: 1,
    fecha: "2024-04-12",
    tipo: "Provisional",
    interes: 8,
    capital: 10000000,
    cuotaMensual: 925000,
    totalPagar: 11100000,
    ganancia: 1100000,
  },
  {
    id: 2,
    fecha: "2024-04-14",
    tipo: "Fidelidad",
    interes: 8,
    capital: 15000000,
    cuotaMensual: 870000,
    totalPagar: 10440000,
    ganancia: 440000,
  },
  {
    id: 3,
    fecha: "2024-04-15",
    tipo: "Educativo",
    interes: 12,
    capital: 8000000,
    cuotaMensual: 715000,
    totalPagar: 8580000,
    ganancia: 580000,
  },
];

const SimulatorHistory = () => {
  const [historial] = useState<Simulacion[]>(historialInicial);
  const [filtroFecha, setFiltroFecha] = useState<string>("");

  const historialFiltrado = filtroFecha
    ? historial.filter((sim) => sim.fecha === filtroFecha)
    : historial;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-20 px-4 animate-fade-in max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Historial de Simulaciones</h1>

        {/* Filtro por fecha */}
        <div className="mb-6 flex items-center gap-4">
          <label className="text-sm font-medium">Filtrar por fecha:</label>
          <input
            type="date"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          />
        </div>

        {/* Tabla de historial */}
        <div className="overflow-x-auto">
          <table className="min-w-full border divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Capital</th>
                <th className="px-4 py-2">Interés</th>
                <th className="px-4 py-2">Cuota Mensual</th>
                <th className="px-4 py-2">Total a Pagar</th>
                <th className="px-4 py-2">Ganancia</th>
              </tr>
            </thead>
            <tbody>
              {historialFiltrado.map((sim) => (
                <tr key={sim.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{sim.fecha}</td>
                  <td className="px-4 py-2">{sim.tipo}</td>
                  <td className="px-4 py-2">{formatoPesos.format(sim.capital)}</td>
                  <td className="px-4 py-2">{sim.interes}%</td>
                  <td className="px-4 py-2">{formatoPesos.format(sim.cuotaMensual)}</td>
                  <td className="px-4 py-2">{formatoPesos.format(sim.totalPagar)}</td>
                  <td className="px-4 py-2">{formatoPesos.format(sim.ganancia)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botones de exportación */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => exportHistorialToPDF(historialFiltrado)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Exportar a PDF
          </button>

          <button
            onClick={() => exportHistorialToCSV(historialFiltrado)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Exportar a CSV
          </button>
        </div>
      </section>
    </div>
  );
};

export default SimulatorHistory;
