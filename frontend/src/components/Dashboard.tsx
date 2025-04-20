// Dashboard.tsx
// Componente principal del dashboard administrativo con métricas y gráficas interactivas
// Usa Tailwind CSS para estilos y Recharts para visualización de datos profesionales

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

// Colores personalizados para el gráfico de torta
const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

// Datos de ejemplo para las tarjetas de resumen
const metricas = [
  { titulo: "Socios Activos", valor: 250, color: "bg-blue-100", texto: "text-blue-700" },
  { titulo: "Créditos Vigentes", valor: 90, color: "bg-yellow-100", texto: "text-yellow-700" },
  { titulo: "Fondos Disponibles", valor: "$120M", color: "bg-green-100", texto: "text-green-700" },
  { titulo: "Rendimientos", valor: "$18M", color: "bg-red-100", texto: "text-red-700" },
];

// Datos de ejemplo para el gráfico de barras (mensual)
const ingresosEgresos = [
  { mes: "Ene", ingresos: 5000000, egresos: 3000000 },
  { mes: "Feb", ingresos: 4800000, egresos: 3200000 },
  { mes: "Mar", ingresos: 5300000, egresos: 3100000 },
  { mes: "Abr", ingresos: 6000000, egresos: 3500000 },
  { mes: "May", ingresos: 6200000, egresos: 4000000 },
];

// Datos de ejemplo para gráfico de torta
const distribucionFondos = [
  { nombre: "Ahorros", valor: 45 },
  { nombre: "Créditos", valor: 35 },
  { nombre: "Inversiones", valor: 15 },
  { nombre: "Operación", valor: 5 },
];

// Datos para gráfico de líneas (crecimiento mensual de socios)
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
        {metricas.map((metrica, i) => (
          <div key={i} className={`p-4 rounded shadow ${metrica.color}`}>
            <h3 className={`text-sm font-medium ${metrica.texto}`}>{metrica.titulo}</h3>
            <p className="text-xl font-bold mt-1">{metrica.valor}</p>
          </div>
        ))}
      </div>

      {/* Gráficas: barra, torta y línea */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Gráfico de barras */}
        <div className="bg-white border rounded p-4 shadow-md col-span-2">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Ingresos vs Egresos Mensuales</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ingresosEgresos}>
              <XAxis dataKey="mes" />
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
          <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">Distribución de Fondos</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={distribucionFondos}
                dataKey="valor"
                nameKey="nombre"
                outerRadius={90}
                label
              >
                {distribucionFondos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de líneas */}
      <div className="mt-10 bg-white border rounded p-4 shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">Crecimiento de Socios</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={crecimientoSocios}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip formatter={(value: number) => value} />
            <Legend />
            <Line type="monotone" dataKey="socios" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
