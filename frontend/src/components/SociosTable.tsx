// SociosTable.tsx
// Tabla para mostrar los socios con interfaz responsiva y clara

import React from "react";

// Definición del tipo de datos para un socio
interface Socio {
  id: number;
  nombre: string;
  cedula: string;
  email: string;
  telefono: string;
  estado: string;
}

// Props que el componente espera
interface Props {
  socios: Socio[];
}

const SociosTable: React.FC<Props> = ({ socios }) => {
  return (
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
            <th className="px-4 py-3 text-sm font-semibold text-blue-700">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {socios.map((socio, index) => (
            <tr key={socio.id} className="hover:bg-blue-50">
              <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
              <td className="px-4 py-2 text-sm text-gray-800 font-medium">{socio.nombre}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{socio.cedula}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{socio.email}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{socio.telefono}</td>
              <td className="px-4 py-2 text-sm">
                <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${socio.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {socio.estado}
                </span>
              </td>
              <td className="px-4 py-2 text-sm text-center">
                <button className="text-blue-600 hover:underline text-sm">Ver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SociosTable;
