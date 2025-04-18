// SociosTable.tsx
// Componente de tabla que muestra la lista de socios con acciones: Ver, Editar, Eliminar y Crear en modales personalizados sin librerías externas

import React, { useState } from "react";
import { Socio } from "../types/Socio";

// Props que recibe el componente
interface SociosTableProps {
  socios: Socio[];
  onDelete: (id: string) => void;
  onEdit: (socioActualizado: Socio) => void;
  onAdd: (nuevoSocio: Socio) => void;
}

const SociosTable: React.FC<SociosTableProps> = ({ socios, onDelete, onEdit, onAdd }) => {
  const [modal, setModal] = useState<"ver" | "editar" | "eliminar" | "crear" | null>(null);
  const [socioActivo, setSocioActivo] = useState<Socio | null>(null);
  const [vista, setVista] = useState<"tabla" | "tarjetas">("tabla"); // Nueva opción para alternar visualización

  const abrirModal = (tipo: "ver" | "editar" | "eliminar" | "crear", socio?: Socio) => {
    setSocioActivo(socio || null);
    setModal(tipo);
  };

  const cerrarModal = () => {
    setModal(null);
    setSocioActivo(null);
  };

  const confirmarEliminacion = () => {
    if (socioActivo) {
      onDelete(socioActivo.id);
      cerrarModal();
    }
  };

  return (
    <div className="overflow-x-auto relative">
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
          onClick={() => abrirModal("crear")}
        >
          + Crear nuevo socio
        </button>
        <button
          onClick={() => setVista(vista === "tabla" ? "tarjetas" : "tabla")}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
        >
          Cambiar a vista {vista === "tabla" ? "tarjetas" : "tabla"}
        </button>
      </div>

      {/* Vista tipo tabla */}
      {vista === "tabla" && (
        <table className="min-w-full border divide-y divide-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">Foto</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Nombre</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Correo</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Teléfono</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">País</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {socios.map((socio) => (
              <tr key={socio.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img src={socio.foto} alt="Foto" className="w-10 h-10 rounded-full" />
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">{socio.nombre}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{socio.correo}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{socio.telefono}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{socio.pais}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => abrirModal("ver", socio)}
                    className="text-sm px-3 py-1 border rounded text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => abrirModal("editar", socio)}
                    className="text-sm px-3 py-1 border rounded text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => abrirModal("eliminar", socio)}
                    className="text-sm px-3 py-1 border rounded text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Vista tipo tarjetas */}
      {vista === "tarjetas" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socios.map((socio) => (
            <div
              key={socio.id}
              className="bg-white border rounded-lg shadow-md p-6 transition hover:shadow-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-blue-700">{socio.nombre}</h3>
                <img src={socio.foto} alt="Foto" className="w-12 h-12 rounded-full" />
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Correo:</strong> {socio.correo}</p>
                <p><strong>Teléfono:</strong> {socio.telefono}</p>
                <p><strong>País:</strong> {socio.pais}</p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => abrirModal("ver", socio)}
                  className="text-xs px-2 py-1 border rounded text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  Ver
                </button>
                <button
                  onClick={() => abrirModal("editar", socio)}
                  className="text-xs px-2 py-1 border rounded text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                >
                  Editar
                </button>
                <button
                  onClick={() => abrirModal("eliminar", socio)}
                  className="text-xs px-2 py-1 border rounded text-red-600 border-red-600 hover:bg-red-50"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Los modales existentes siguen igual abajo... */}
    </div>
  );
};

export default SociosTable;
