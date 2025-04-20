// Dashboard.tsx
// Componente principal del dashboard administrativo con métricas, gráficas interactivas y exportación

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

// Importamos las funciones de exportación
import {
  exportDashboardToPDF,
  exportDashboardToCSV,
} from "../utils/ExportDashboardUtils";

// Paleta de colores personalizada para el gráfico de torta
const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

// Datos simulados para tarjetas de resumen
const metricas = {
  fondos: 120_000_000,
  socios: 250,
  creditos: 90,
  rendimientos: 18_000_000,
};

// Tarjetas pequeñas del dashboard
const metricasCards = [
  {
    titulo: "Socios Activos",
    valor: metricas.socios,
    color: "bg-blue-100",
    texto: "text-blue-700",
  },
  {
    titulo: "Créditos Vigentes",
    valor: metricas.creditos,
    color: "bg-yellow-100",
    texto: "text-yellow-700",
  },
  {
    titulo: "Fondos Disponibles",
    valor: `$${(metricas.fondos / 1_000_000).toFixed(1)}M`,
    color: "bg-green-100",
    texto: "text-green-700",
  },
  {
    titulo: "Rendimientos",
    valor: `$${(metricas.rendimientos / 1_000_000).toFixed(1)}M`,
    color: "bg-red-100",
    texto: "text-red-700",
  },
];

// Datos simulados para gráfico de barras
const dataBarras = [
  { name: "Ene", ingresos: 5000000, egresos: 3000000 },
  { name: "Feb", ingresos: 4800000, egresos: 3200000 },
  { name: "Mar", ingresos: 5300000, egresos: 3100000 },
  { name: "Abr", ingresos: 6000000, egresos: 3500000 },
  { name: "May", ingresos: 6200000, egresos: 4000000 },
];

// Datos para gráfico de torta
const dataTorta = [
  { name: "Ahorros", valor: 45 },
  { name: "Créditos", valor: 35 },
  { name: "Inversiones", valor: 15 },
  { name: "Operación", valor: 5 },
];

// Datos de crecimiento de socios (gráfico de línea)
const crecimientoSocios = [
  { mes: "Ene", socios: 210 },
  { mes: "Feb", socios: 220 },
  { mes: "Mar", socios: 230 },
  { mes: "Abr", socios: 240 },
  { mes: "May", socios: 250 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-white animate-fade-in pl-48 pr-4 py-6 ml-6">
      {/* Título principal */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard General</h1>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {metricasCards.map((m, i) => (
          <div key={i} className={`p-4 rounded shadow ${m.color}`}>
            <h3 className={`text-sm font-medium ${m.texto}`}>{m.titulo}</h3>
            <p className="text-xl font-bold mt-1">{m.valor}</p>
          </div>
        ))}
      </div>

      {/* Botones de exportación */}
      <div className="flex justify-end gap-4 mb-6">
        <button
          onClick={() => exportDashboardToPDF(metricas, dataBarras, dataTorta)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Exportar PDF
        </button>
        <button
          onClick={() => exportDashboardToCSV(metricas, dataBarras, dataTorta)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Exportar CSV
        </button>
      </div>

      {/* Gráficas: barra y torta */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Gráfico de barras */}
        <div className="bg-white border rounded p-4 shadow-md col-span-2">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Ingresos vs Egresos Mensuales
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataBarras}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${(value / 1_000_000).toFixed(1)}M`} />
              <Legend />
              <Bar dataKey="ingresos" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="egresos" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de torta */}
        <div className="bg-white border rounded p-4 shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Distribución de Fondos
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataTorta}
                dataKey="valor"
                nameKey="name"
                outerRadius={90}
                label
              >
                {dataTorta.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de línea */}
      <div className="mt-10 bg-white border rounded p-4 shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
          Crecimiento de Socios
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={crecimientoSocios}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="socios"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
