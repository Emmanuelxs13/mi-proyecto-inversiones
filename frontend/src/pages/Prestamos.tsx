import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  exportPrestamosToCSV,
  exportPrestamosToPDF,
} from "../utils/ExportPrestamosUtils";
import { PrestamoVista } from "../types/PrestamoVista";
import FormularioPrestamoModal from "../components/FormularioPrestamoModal";

// Estructura del préstamo
interface Prestamo {
  id: number;
  id_usuario: number;
  nombre_usuario: string;
  id_tipo_prestamo: number;
  tipo_prestamo: string;
  monto: number;
  cuotas_total: number;
  fecha_inicio: string;
  estado: "vigente" | "pendiente" | "cancelado";
}

const Prestamos = () => {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]); // Estado para almacenar los préstamos
  const [filtro, setFiltro] = useState<string>("todos"); // Estado para los filtros de préstamos
  const [alerta, setAlerta] = useState<string | null>(null); // Estado para mostrar alertas
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [modalData, setModalData] = useState<Prestamo | null>(null); // Estado para almacenar los datos del préstamo que se verán o editarán
  const [modoEdicion, setModoEdicion] = useState<boolean>(false); // Estado para determinar si el modal es en modo edición o solo visualización

  // Obtener los préstamos desde el backend
  const obtenerPrestamos = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/prestamos`
      );
      const data = await res.json();
      console.log(data); // Verifica los datos obtenidos
      setPrestamos(data);
    } catch (error) {
      console.error("Error al cargar préstamos:", error);
    }
  };

  useEffect(() => {
    obtenerPrestamos(); // Obtiene los préstamos al cargar el componente
  }, []);

  // Filtrar los préstamos según el estado
  const prestamosFiltrados =
    filtro === "todos"
      ? prestamos
      : prestamos.filter((p) => p.estado === filtro);

  // Crear una vista específica para los préstamos
  const prestamosVista: PrestamoVista[] = prestamosFiltrados.map((p) => ({
    id: p.id,
    nombreSocio: p.nombre_usuario,
    tipoPrestamo: p.tipo_prestamo,
    monto: p.monto,
    cuotasTotal: p.cuotas_total,
    fechaInicio: p.fecha_inicio,
    estado: p.estado,
  }));

  // Función para asignar colores a los estados
  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "vigente":
        return "bg-green-200 text-green-800"; // Vigente: verde pastel
      case "pendiente":
        return "bg-yellow-200 text-yellow-800"; // Pendiente: amarillo pastel
      case "cancelado":
        return "bg-red-200 text-red-800"; // Cancelado: rojo pastel
      default:
        return "bg-gray-200 text-gray-800"; // Por defecto, gris pastel
    }
  };

  // Eliminar un préstamo
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/prestamos/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      setAlerta(data.mensaje || "Préstamo eliminado correctamente"); // Muestra un mensaje de éxito
      setPrestamos(prestamos.filter((p) => p.id !== id)); // Actualiza el listado de préstamos
    } catch (error) {
      console.error("Error al eliminar préstamo:", error);
    }
  };

  // Abrir el modal en modo ver (solo lectura)
  const handleView = (id: number) => {
    const prestamo = prestamos.find((p) => p.id === id); // Busca el préstamo por ID
    if (prestamo) {
      setModalData(prestamo); // Establece los datos del préstamo en el estado
      setModoEdicion(false); // Establece que es solo visualización
      setMostrarModal(true); // Abre el modal
    }
  };

  // Abrir el modal en modo editar
  const handleEdit = (id: number) => {
    const prestamo = prestamos.find((p) => p.id === id); // Busca el préstamo por ID
    if (prestamo) {
      setModalData(prestamo); // Establece los datos del préstamo en el estado
      setModoEdicion(true); // Establece que es modo edición
      setMostrarModal(true); // Abre el modal
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 lg:pl-64 bg-gray-50 animate-fade-in">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Gestión de Préstamos</h1>

      {/* Filtros y acciones */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
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

        <div className="flex gap-2">
          <button
            onClick={() => setMostrarModal(true)}
            className="bg-primary hover:bg-primary-darker text-white px-4 py-2 rounded text-sm"
          >
            Crear Préstamo
          </button>

          <button
            onClick={() => exportPrestamosToPDF(prestamosVista)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
          >
            Exportar PDF
          </button>
          <button
            onClick={() => exportPrestamosToCSV(prestamosVista)}
            className="bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
          >
            Exportar CSV
          </button>
        </div>
      </div>

      {alerta && (
        <div className="bg-green-100 text-green-800 p-2 rounded mb-4 text-sm">
          {alerta}
        </div>
      )}

      {/* Tabla de préstamos */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-primary-darker text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Socio</th>
              <th className="px-4 py-2 text-left">Tipo</th>
              <th className="px-4 py-2 text-left">Monto</th>
              <th className="px-4 py-2 text-left">Cuotas</th>
              <th className="px-4 py-2 text-left">Inicio</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {prestamosFiltrados.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-2">{p.id}</td>
                <td className="px-4 py-2">{p.nombre_usuario}</td>
                <td className="px-4 py-2">{p.tipo_prestamo}</td>
                <td className="px-4 py-2">
                  ${p.monto.toLocaleString("es-CO")}
                </td>
                <td className="px-4 py-2">{p.cuotas_total}</td>
                <td className="px-4 py-2">
                  {format(new Date(p.fecha_inicio), "yyyy-MM-dd")}
                </td>
                <td
                  className={`px-4 py-2 mt-2 capitalize ${getStatusColor(
                    p.estado
                  )} rounded-full text-xs inline-block px-3`}
                >
                  {p.estado}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleView(p.id)}
                    className="bg-accent hover:bg-primary-darker text-white px-4 py-2 rounded-md mr-2"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => handleEdit(p.id)}
                    className="bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para ver o editar préstamo */}
      {mostrarModal && (
        <FormularioPrestamoModal
          visible={mostrarModal}
          onClose={() => setMostrarModal(false)}
          onSuccess={() => {
            setMostrarModal(false);
            obtenerPrestamos();
          }}
          prestamo={modalData}
          modoEdicion={modoEdicion} // Se pasa el estado de edición
        />
      )}
    </div>
  );
};

export default Prestamos;
