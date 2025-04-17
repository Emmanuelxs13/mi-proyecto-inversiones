// HistorialSimulaciones.tsx
// Página que muestra el historial de simulaciones guardadas desde localStorage

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

// Tipo de datos de una simulación
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

  // Al cargar el componente, leemos el historial desde localStorage
  useEffect(() => {
    const dataGuardada = localStorage.getItem("historial_simulaciones");
    if (dataGuardada) {
      setSimulaciones(JSON.parse(dataGuardada));
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-12 px-6 max-w-5xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Historial de Simulaciones</h1>

        {simulaciones.length === 0 ? (
          <p className="text-gray-600">No hay simulaciones guardadas aún.</p>
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
                {simulaciones.map((sim, i) => (
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
