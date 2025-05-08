// Página de historial de simulaciones con exportación a PDF y CSV

import React, { useState } from "react";
import { exportHistorialToPDF, exportHistorialToCSV } from "../../utils/ExportUtils";
import { Simulacion } from "../../types/Simulacion";

const formatoPesos = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 2,
});

// Datos simulados iniciales
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
  const [vista, setVista] = useState<"tabla" | "tarjetas">("tarjetas"); // Estado de vista

  // Historial filtrado por fecha si aplica
  const historialFiltrado = filtroFecha
    ? historial.filter((sim) => sim.fecha === filtroFecha)
    : historial;

  return (
    <div className="min-h-screen p-6 bg-white animate-fade-in pl-48 pr-4 py-6 ml-6">

      <section className="py-20 px-4 animate-fade-in max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Historial de Simulaciones</h1>

        {/* Filtro por fecha */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Filtrar por fecha:</label>
            <input
              type="date"
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            />
          </div>

          {/* Alternador de vista */}
          <div className="flex gap-2">
            <button
              className={`px-4 py-1 rounded text-sm border ${
                vista === "tabla" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border-blue-600"
              }`}
              onClick={() => setVista("tabla")}
            >
              Tabla
            </button>
            <button
              className={`px-4 py-1 rounded text-sm border ${
                vista === "tarjetas" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border-blue-600"
              }`}
              onClick={() => setVista("tarjetas")}
            >
              Tarjetas
            </button>
          </div>
        </div>

        {/* Vista de Tabla o Tarjetas */}
        {vista === "tabla" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border divide-y divide-gray-300">
              <thead className="bg-blue-600 text-white text-sm">
                <tr>
                  <th className="px-4 py-2 text-left">Fecha</th>
                  <th className="px-4 py-2 text-left">Tipo</th>
                  <th className="px-4 py-2 text-left">Capital</th>
                  <th className="px-4 py-2 text-left">Interés anual</th>
                  <th className="px-4 py-2 text-left">Cuota mensual</th>
                  <th className="px-4 py-2 text-left">Total a pagar</th>
                  <th className="px-4 py-2 text-left">Ganancia</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-200">
                {historialFiltrado.map((sim) => (
                  <tr key={sim.id}>
                    <td className="px-4 py-2">{new Date(sim.fecha).toLocaleDateString()}</td>
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
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {historialFiltrado.map((sim) => (
              <div
                key={sim.id}
                className="bg-white border rounded-lg shadow-md p-6 transition hover:shadow-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-blue-700">
                    {sim.tipo} - {new Date(sim.fecha).toLocaleDateString()}
                  </h3>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Capital:</strong> {formatoPesos.format(sim.capital)}</p>
                  <p><strong>Interés anual:</strong> {sim.interes}%</p>
                  <p><strong>Cuota mensual:</strong> {formatoPesos.format(sim.cuotaMensual)}</p>
                  <p><strong>Total a pagar:</strong> {formatoPesos.format(sim.totalPagar)}</p>
                  <p><strong>Ganancia:</strong> {formatoPesos.format(sim.ganancia)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botones de exportación */}
        <div className="flex justify-center mt-10 gap-4">
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
