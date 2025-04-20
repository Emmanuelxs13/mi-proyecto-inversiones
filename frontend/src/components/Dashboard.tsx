// src/pages/Dashboard.tsx
// Dashboard visual moderno y funcional con métricas, gráficas y exportación

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
import { exportDashboardToPDF, exportDashboardToCSV } from "../utils/ExportDashboardUtils";
import { useNavigate } from "react-router-dom";

// 🎨 Paleta de colores del dashboard
const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

// 📊 Datos simulados para las tarjetas de métricas
const metricas = {
  fondos: 120_000_000,
  socios: 250,
  creditos: 90,
  rendimientos: 18_000_000,
};

// 🎯 Tarjetas individuales con estilos y valores
const metricasCards = [
  {
    titulo: "Socios Activos",
    valor: metricas.socios,
    color: "bg-blue-50",
    texto: "text-blue-600",
    icon: "👥",
  },
  {
    titulo: "Créditos Vigentes",
    valor: metricas.creditos,
    color: "bg-yellow-50",
    texto: "text-yellow-600",
    icon: "💳",
  },
  {
    titulo: "Fondos Disponibles",
    valor: `$${(metricas.fondos / 1_000_000).toFixed(1)}M`,
    color: "bg-green-50",
    texto: "text-green-600",
    icon: "💰",
  },
  {
    titulo: "Rendimientos",
    valor: `$${(metricas.rendimientos / 1_000_000).toFixed(1)}M`,
    color: "bg-red-50",
    texto: "text-red-600",
    icon: "📈",
  },
];

// 📅 Datos para gráfico de barras (ingresos y egresos mensuales)
const dataBarras = [
  { name: "Ene", ingresos: 5000000, egresos: 3000000 },
  { name: "Feb", ingresos: 4800000, egresos: 3200000 },
  { name: "Mar", ingresos: 5300000, egresos: 3100000 },
  { name: "Abr", ingresos: 6000000, egresos: 3500000 },
  { name: "May", ingresos: 6200000, egresos: 4000000 },
];

// 📘 Datos para gráfico de torta (distribución de fondos)
const dataTorta = [
  { name: "Ahorros", valor: 45 },
  { name: "Créditos", valor: 35 },
  { name: "Inversiones", valor: 15 },
  { name: "Operación", valor: 5 },
];

// 📈 Datos para gráfico de línea (crecimiento de socios)
const crecimientoSocios = [
  { mes: "Ene", socios: 210 },
  { mes: "Feb", socios: 220 },
  { mes: "Mar", socios: 230 },
  { mes: "Abr", socios: 240 },
  { mes: "May", socios: 250 },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-6 pt-6 pb-12 lg:pl-64 animate-fade-in">
      {/* Título del dashboard */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard General</h1>

      {/* 🧾 Tarjetas de métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {metricasCards.map((card, index) => (
          <div key={index} className={`rounded-xl shadow-sm p-5 ${card.color}`}>
            <div className="flex items-center gap-3">
              <span className="text-xl">{card.icon}</span>
              <h3 className={`text-md font-semibold ${card.texto}`}>{card.titulo}</h3>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-800">{card.valor}</p>
          </div>
        ))}
      </div>

      {/* 🎛 Botones de acción */}
      <div className="flex flex-wrap justify-end gap-4 mb-8">
        <button
          onClick={() => navigate("/simulador")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md text-sm"
        >
          Ir al Simulador
        </button>
        <button
          onClick={() => exportDashboardToPDF(metricas, dataBarras, dataTorta)}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md text-sm"
        >
          Exportar PDF
        </button>
        <button
          onClick={() => exportDashboardToCSV(metricas, dataBarras, dataTorta)}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md text-sm"
        >
          Exportar CSV
        </button>
      </div>

      {/* 📊 Gráficas de barras y torta */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Ingresos vs Egresos */}
        <div className="bg-white rounded-xl p-6 shadow col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Ingresos vs Egresos Mensuales</h2>
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

        {/* Distribución de fondos */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Distribución de Fondos</h2>
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

      {/* 📈 Gráfico de línea: crecimiento de socios */}
      <div className="mt-10 bg-white rounded-xl p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Crecimiento de Socios</h2>
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
