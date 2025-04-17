// HistorialSimulaciones.tsx
// Página que muestra el historial de simulaciones con filtro por fechas

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

// Tipo de datos para cada simulación
interface Simulacion {
  tipo: string;
  capital: number;
  interes: number;
  plazo: number;
  cuotaMensual: number;
  totalPagar: number;
  ganancia: number;
  fecha: string; 
}

const formatoPesos = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 2,
});

const HistorialSimulaciones = () => {
  const [simulaciones, setSimulaciones] = useState<Simulacion[]>([]);
  const [desde, setDesde] = useState(""); // fecha desde (input)
  const [hasta, setHasta] = useState(""); // fecha hasta (input)

  // Al cargar el componente, trae los datos del localStorage
  useEffect(() => {
    const dataGuardada = localStorage.getItem("historial_simulaciones");
    if (dataGuardada) {
      setSimulaciones(JSON.parse(dataGuardada));
    }
  }, []);

  // Filtrar por rango de fechas
  const simulacionesFiltradas = simulaciones.filter((sim) => {
    const fechaSim = new Date(sim.fecha); // Convertir texto a Date
    const desdeFecha = desde ? new Date(desde) : null;
    const hastaFecha = hasta ? new Date(hasta) : null;

    // Comparar solo si se ha ingresado una fecha válida
    const cumpleDesde = !desdeFecha || fechaSim >= desdeFecha;
    const cumpleHasta = !hastaFecha || fechaSim <= hastaFecha;

    return cumpleDesde && cumpleHasta;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-12 px-6 max-w-6xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Historial de Simulaciones</h1>

        {/* Filtros de fechas */}
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <div>
            <label className="block text-sm text-gray-600">Desde:</label>
            <input
              type="date"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Hasta:</label>
            <input
              type="date"
              value={hasta}
              onChange={(e) => setHasta(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
        </div>

        {/* Tabla de resultados */}
        {simulacionesFiltradas.length === 0 ? (
          <p className="text-gray-600">No hay simulaciones en este rango de fechas.</p>
        ) : (
          <div className="overflow-x-auto border rounded shadow">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Tipo</th>
                  <th className="px-4 py-2">Capital</th>
                  <th className="px-4 py-2">Interés (%)</th>
                  <th className="px-4 py-2">Plazo (meses)</th>
                  <th className="px-4 py-2">Cuota</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Ganancia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {simulacionesFiltradas.map((sim, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{sim.fecha}</td>
                    <td className="px-4 py-2">{sim.tipo}</td>
                    <td className="px-4 py-2">{formatoPesos.format(sim.capital)}</td>
                    <td className="px-4 py-2">{sim.interes}</td>
                    <td className="px-4 py-2">{sim.plazo}</td>
                    <td className="px-4 py-2">{formatoPesos.format(sim.cuotaMensual)}</td>
                    <td className="px-4 py-2">{formatoPesos.format(sim.totalPagar)}</td>
                    <td className="px-4 py-2">{formatoPesos.format(sim.ganancia)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default HistorialSimulaciones;
