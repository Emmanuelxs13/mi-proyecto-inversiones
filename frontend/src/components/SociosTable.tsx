import React, { useState } from "react";

// Tipo de dato para socio
interface Socio {
  id: number;
  nombre: string;
  cedula: string;
  email: string;
  telefono: string;
  estado: string;
}

interface Props {
  socios: Socio[];
}

const SociosTable: React.FC<Props> = ({ socios }) => {
  // Estado para el modal y el socio seleccionado
  const [socioSeleccionado, setSocioSeleccionado] = useState<Socio | null>(null);

  return (
    <>
      {/* Tabla */}
      <div className="overflow-x-auto bg-white shadow-md rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-blue-700">#</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-blue-700">Nombre</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-blue-700">Cédula</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-blue-700">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-blue-700">Teléfono</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-blue-700">Estado</th>
              <th className="px-4 py-3 text-sm font-semibold text-blue-700 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {socios.map((socio, index) => (
              <tr key={socio.id} className="hover:bg-blue-50">
                <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                <td className="px-4 py-2 text-sm font-medium text-gray-800">{socio.nombre}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{socio.cedula}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{socio.email}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{socio.telefono}</td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                      socio.estado === "Activo"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {socio.estado}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-center">
                  {/* Botón para mostrar modal de detalle */}
                  <button
                    className="text-blue-600 hover:underline text-sm"
                    onClick={() => setSocioSeleccionado(socio)}
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para ver detalles */}
      {socioSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Detalle del Socio</h2>
            <ul className="space-y-2 text-sm text-gray-800">
              <li><strong>Nombre:</strong> {socioSeleccionado.nombre}</li>
              <li><strong>Cédula:</strong> {socioSeleccionado.cedula}</li>
              <li><strong>Email:</strong> {socioSeleccionado.email}</li>
              <li><strong>Teléfono:</strong> {socioSeleccionado.telefono}</li>
              <li><strong>Estado:</strong> {socioSeleccionado.estado}</li>
            </ul>

            <div className="text-right mt-6">
              <button
                onClick={() => setSocioSeleccionado(null)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}


      
    </>
  );
};

export default SociosTable;
