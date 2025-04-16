// SociosTable.tsx
// Componente de tabla que muestra la lista de socios con acciones: Ver, Editar y Eliminar en modales simples personalizados (sin shadcn/ui)

import React, { useState } from "react";
import { Socio } from "../types/Socio";

// Definimos los props que recibe el componente
/* interface SociosTableProps {
  socios: Socio[];
  onView: (socio: Socio) => void;
  onEdit: (socio: Socio) => void;
  onDelete: (id: string) => void;
}
 */
// Importa useEffect si lo necesitas y asegúrate de recibir esta prop:
interface SociosTableProps {
  socios: Socio[];
  onDelete: (id: string) => void;
  onEdit: (socioActualizado: Socio) => void; // 🆕 Nueva función para actualizar socio
}

const SociosTable: React.FC<SociosTableProps> = ({ socios, onDelete }) => {
  // Control del tipo de modal abierto: "ver", "editar" o "eliminar"
  const [modal, setModal] = useState<"ver" | "editar" | "eliminar" | null>(null);
  const [socioActivo, setSocioActivo] = useState<Socio | null>(null); // Socio actual seleccionado

  // Abre el modal correspondiente con el socio seleccionado
  const abrirModal = (tipo: "ver" | "editar" | "eliminar", socio: Socio) => {
    setSocioActivo(socio);
    setModal(tipo);
  };

  // Cierra cualquier modal abierto
  const cerrarModal = () => {
    setModal(null);
    setSocioActivo(null);
  };

  // Función que ejecuta la eliminación y cierra el modal
  const confirmarEliminacion = () => {
    if (socioActivo) {
      onDelete(socioActivo.id);
      cerrarModal();
    }
  };

  return (
    <div className="overflow-x-auto relative">
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

      {/* Modal Ver */}
      {modal === "ver" && socioActivo && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm shadow-xl animate-fade-in">
            <h2 className="text-lg font-semibold text-blue-700 mb-4">Información del Socio</h2>
            <img src={socioActivo.foto} alt="Foto" className="w-20 h-20 rounded-full mx-auto mb-4" />
            <p><strong>Nombre:</strong> {socioActivo.nombre}</p>
            <p><strong>Correo:</strong> {socioActivo.correo}</p>
            <p><strong>Teléfono:</strong> {socioActivo.telefono}</p>
            <p><strong>País:</strong> {socioActivo.pais}</p>
            <button
              className="mt-4 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={cerrarModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal Editar */}
      {modal === "editar" && socioActivo && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm shadow-xl animate-fade-in">
            <h2 className="text-lg font-semibold text-yellow-600 mb-4">Editar Socio</h2>
            <input  id="nombre"
              className="w-full border rounded px-3 py-2 mb-2"
              defaultValue={socioActivo.nombre}
              placeholder="Nombre"
            />
            <input id="correo"
              className="w-full border rounded px-3 py-2 mb-2"
              defaultValue={socioActivo.correo}
              placeholder="Correo"
            />
            <input  id="telefono"
              className="w-full border rounded px-3 py-2 mb-2"
              defaultValue={socioActivo.telefono}
              placeholder="Teléfono"
            />
            <input  id="pais"
              className="w-full border rounded px-3 py-2 mb-2"
              defaultValue={socioActivo.pais}
              placeholder="País"
            />
            <div className="flex justify-between">
              <button
                className="mt-2 px-4 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={cerrarModal}
              >
                Cancelar
              </button>

              <button
                className="mt-2 px-4 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                onClick={() => {
                  if (socioActivo) {
                    const socioEditado = {
                      ...socioActivo,
                      nombre: (document.getElementById("nombre") as HTMLInputElement).value,
                      correo: (document.getElementById("correo") as HTMLInputElement).value,
                      telefono: (document.getElementById("telefono") as HTMLInputElement).value,
                      pais: (document.getElementById("pais") as HTMLInputElement).value,
                    };
                    onEdit(socioEditado); // ✅ Llama al padre
                    cerrarModal();
                  }
                }}
              >
                Guardar
            </button>

            </div>
          </div>
        </div>
      )}

      {/* Modal Eliminar */}
      {modal === "eliminar" && socioActivo && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm shadow-xl animate-fade-in text-center">
            <h2 className="text-lg font-semibold text-red-600 mb-4">¿Eliminar Socio?</h2>
            <p className="text-gray-700">¿Estás seguro que deseas eliminar a <strong>{socioActivo.nombre}</strong>?</p>
            <div className="flex justify-between mt-6">
              <button
                className="px-4 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={cerrarModal}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={confirmarEliminacion}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SociosTable;
