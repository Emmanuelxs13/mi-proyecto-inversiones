// Prestamos.tsx
// Página que muestra los préstamos registrados y permite su creación
// Usa Tailwind para estilos, fetch para consumo de API, y exportación CSV/PDF

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { exportPrestamosToCSV, exportPrestamosToPDF } from "../utils/ExportPrestamosUtils";

// Tipo para representar un préstamo (debe coincidir con tu backend)
interface Prestamo {
  id: number;
  id_usuario: number;
  nombre_usuario?: string; // Campo opcional si se trae desde una JOIN en el backend
  id_tipo_prestamo: number;
  tipo_prestamo?: string; // opcional también
  monto: number;
  cuotas_total: number;
  fecha_inicio: string;
  estado: "vigente" | "pendiente" | "cancelado";
}

const Prestamos = () => {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [filtro, setFiltro] = useState<string>("todos");
  const [alerta, setAlerta] = useState<string | null>(null);

  // Fetch de datos desde el backend
  const obtenerPrestamos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/prestamos");
      const data = await res.json();
      setPrestamos(data);
    } catch (error) {
      console.error("Error al cargar préstamos:", error);
    }
  };

  useEffect(() => {
    obtenerPrestamos();
  }, []);

  // Filtro de estado
  const prestamosFiltrados =
    filtro === "todos"
      ? prestamos
      : prestamos.filter((p) => p.estado === filtro);

  // Crear préstamo con datos simulados
  const crearPrestamoSimulado = async () => {
    const nuevo = {
      id_usuario: 1,
      id_tipo_prestamo: 1,
      monto: 2000000,
      cuotas_total: 6,
      fecha_inicio: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await fetch("http://localhost:3000/api/prestamos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo),
      });

      if (res.ok) {
        setAlerta("Préstamo creado exitosamente.");
        obtenerPrestamos();
        setTimeout(() => setAlerta(null), 3000);
      } else {
        throw new Error("Error al crear préstamo.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 lg:pl-64 bg-gray-50 animate-fade-in">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Gestión de Préstamos</h1>

      {/* Filtros y Acciones */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex gap-2">
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          >
            <option value="todos">Todos</option>
            <option value="vigente">Vigentes</option>
            <option value="pendiente">Pendientes</option>
            <option value="cancelado">Cancelados</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={crearPrestamoSimulado}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm"
          >
            Crear Préstamo
          </button>
          <button
            onClick={() => exportPrestamosToPDF(prestamosFiltrados)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
          >
            Exportar PDF
          </button>
          <button
            onClick={() => exportPrestamosToCSV(prestamosFiltrados)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
          >
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Alerta de creación */}
      {alerta && (
        <div className="bg-green-100 text-green-800 p-2 rounded mb-4 text-sm">
          {alerta}
        </div>
      )}

      {/* Tabla */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Usuario</th>
              <th className="px-4 py-2 text-left">Tipo</th>
              <th className="px-4 py-2 text-left">Monto</th>
              <th className="px-4 py-2 text-left">Cuotas</th>
              <th className="px-4 py-2 text-left">Inicio</th>
              <th className="px-4 py-2 text-left">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {prestamosFiltrados.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-2">{p.id}</td>
                <td className="px-4 py-2">{p.nombre_usuario || `Usuario ${p.id_usuario}`}</td>
                <td className="px-4 py-2">{p.tipo_prestamo || `Tipo ${p.id_tipo_prestamo}`}</td>
                <td className="px-4 py-2">${p.monto.toLocaleString("es-CO")}</td>
                <td className="px-4 py-2">{p.cuotas_total}</td>
                <td className="px-4 py-2">{format(new Date(p.fecha_inicio), "yyyy-MM-dd")}</td>
                <td className="px-4 py-2 capitalize">{p.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Prestamos;
