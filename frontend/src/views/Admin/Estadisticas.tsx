import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { exportChartToPDF, exportChartToCSV } from "../../utils/ExportEstadisticasUtils";

// Datos estáticos de ejemplo
const estadisticas = [
  { nombre: "Socios Activos", valor: 1258 },
  { nombre: "Créditos Vigentes", valor: 462 },
  { nombre: "Fondos Disponibles", valor: 3540000000 },
  { nombre: "Rendimientos Generados", valor: 920000000 },
];

// Colores para las gráficas
const colores = ["#3B82F6", "#10B981", "#FBBF24", "#8B5CF6"];

const Estadisticas = () => {
  const [tipoGrafica, setTipoGrafica] = useState("barra"); // Estado para tipo de gráfica

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-20 px-4 max-w-6xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold text-blue-700 mb-10 text-center">Estadísticas Globales</h1>

        {/* Tarjetas de resumen */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {estadisticas.map((stat, index) => (
            <div
              key={index}
              className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition"
            >
              <p className="text-sm text-blue-600 font-medium">{stat.nombre}</p>
              <p className="text-xl font-bold text-blue-800 mt-1">
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                }).format(stat.valor)}
              </p>
            </div>
          ))}
        </div>

        {/* Selector de tipo de gráfica y botones de exportación */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <label className="font-medium text-gray-700">
            Tipo de gráfica:
            <select
              value={tipoGrafica}
              onChange={(e) => setTipoGrafica(e.target.value)}
              className="ml-2 border rounded px-3 py-1 text-sm"
            >
              <option value="barra">Barras</option>
              <option value="dona">Dona</option>
              <option value="torta">Torta</option>
            </select>
          </label>

          <div className="flex gap-3">
            <button
              onClick={() => exportChartToPDF(estadisticas)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Exportar PDF
            </button>
            <button
              onClick={() => exportChartToCSV(estadisticas)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
            >
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Gráfico dinámico */}
        <div className="bg-white border rounded shadow p-6">
          <ResponsiveContainer width="100%" height={400}>
            {tipoGrafica === "barra" ? (
              <BarChart data={estadisticas}>
                <Bar dataKey="valor" fill="#3B82F6" radius={[5, 5, 0, 0]} />
                <Tooltip formatter={(val: number) => new Intl.NumberFormat("es-CO").format(val)} />
                <Legend />
              </BarChart>
            ) : (
              <PieChart>
                <Pie
                  data={estadisticas}
                  dataKey="valor"
                  nameKey="nombre"
                  outerRadius={150}
                  innerRadius={tipoGrafica === "dona" ? 60 : 0}
                  label
                >
                  {estadisticas.map((_, index) => (
                    <Cell key={index} fill={colores[index % colores.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: number) => new Intl.NumberFormat("es-CO").format(val)} />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default Estadisticas;
