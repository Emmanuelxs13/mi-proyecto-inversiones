// AddSocioModal.tsx
// Componente modal para agregar un nuevo socio desde el frontend con validación básica y estilos adaptables

import React, { useState } from "react";
import { Socio } from "../types/Socio";

interface AddSocioModalProps {
  onAdd: (nuevoSocio: Socio) => void;
  onClose: () => void;
}

const AddSocioModal: React.FC<AddSocioModalProps> = ({ onAdd, onClose }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setdireccion] = useState("");

  // Manejador del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !correo || !telefono || !direccion) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const nuevoSocio: Socio = {
      id: Date.now().toString(), // ID temporal
      nombre,
      correo,
      telefono,
      direccion,
      foto: "https://via.placeholder.com/50", // Foto por defecto
    };

    onAdd(nuevoSocio); // Se lo pasamos al padre
    onClose(); // Cerramos modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md animate-fade-in"
      >
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Agregar Nuevo Socio</h2>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
        />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
        />
        <input
          type="tel"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
        />
        <input
          type="text"
          placeholder="País"
          value={direccion}
          onChange={(e) => setdireccion(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
        />

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSocioModal;
