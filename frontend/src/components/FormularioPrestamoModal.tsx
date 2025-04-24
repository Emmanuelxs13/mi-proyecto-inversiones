// src/components/FormularioPrestamoModal.tsx
// Modal para registrar nuevo socio y préstamo con validaciones y feedback visual

import React, { useEffect, useState } from "react";

// Tipo para los tipos de préstamo disponibles
interface TipoPrestamo {
  id: number;
  nombre: string;
}

// Props esperadas por el componente
interface Props {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const FormularioPrestamoModal = ({ visible, onClose, onSuccess }: Props) => {
  // Estado de campos
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [foto, setFoto] = useState("");
  const [tipoPrestamo, setTipoPrestamo] = useState<number>(1);
  const [monto, setMonto] = useState<number>(0);
  const [cuotas, setCuotas] = useState<number>(6);
  const [tipos, setTipos] = useState<TipoPrestamo[]>([]);
  const [mensaje, setMensaje] = useState<string | null>(null);

  // Cargar tipos de préstamo al montar
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tipos-prestamos`)
      .then((res) => res.json())
      .then(setTipos)
      .catch(() => setMensaje("❌ Error al cargar tipos de préstamo"));
  }, []);

  // Validaciones básicas antes de enviar
  const camposValidos = () => {
    return (
      nombre.length >= 3 &&
      correo.includes("@") &&
      telefono.length >= 7 &&
      direccion.length >= 3 &&
      monto > 0 &&
      cuotas > 0
    );
  };

  // Envío del formulario
  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!camposValidos()) {
      setMensaje("⚠️ Por favor completa todos los campos correctamente.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/crear-prestamo-completo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          correo,
          telefono,
          direccion,
          foto,
          tipoPrestamo,
          monto,
          cuotas,
        }),
      });

      if (!res.ok) throw new Error("Error al registrar préstamo");

      setMensaje("✅ Préstamo registrado con éxito");
      onSuccess();
      setTimeout(() => {
        setMensaje(null);
        onClose();
      }, 2500);
    } catch (error) {
      console.error(error);
      setMensaje("❌ No se pudo registrar el préstamo");
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4 text-blue-700">Registrar Préstamo</h2>

        {mensaje && <div className="text-sm mb-3 text-center text-red-600">{mensaje}</div>}

        <form onSubmit={manejarSubmit} className="grid grid-cols-2 gap-4 text-sm">
          {/* Datos del socio */}
          <label className="col-span-2">
            Nombre completo
            <input required value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full border px-3 py-2 rounded mt-1" />
          </label>
          <label className="col-span-2">
            Correo electrónico
            <input required value={correo} onChange={(e) => setCorreo(e.target.value)} type="email" className="w-full border px-3 py-2 rounded mt-1" />
          </label>
          <label>
            Teléfono
            <input required value={telefono} onChange={(e) => setTelefono(e.target.value)} className="w-full border px-3 py-2 rounded mt-1" />
          </label>
          <label>
            Dirección
            <input required value={direccion} onChange={(e) => setDireccion(e.target.value)} className="w-full border px-3 py-2 rounded mt-1" />
          </label>
          <label className="col-span-2">
            URL de foto (opcional)
            <input value={foto} onChange={(e) => setFoto(e.target.value)} className="w-full border px-3 py-2 rounded mt-1" />
          </label>

          {/* Datos del préstamo */}
          <label className="col-span-2">
            Tipo de préstamo
            <select value={tipoPrestamo} onChange={(e) => setTipoPrestamo(Number(e.target.value))} className="w-full border px-3 py-2 rounded mt-1">
              {tipos.map((t) => (
                <option key={t.id} value={t.id}>{t.nombre}</option>
              ))}
            </select>
          </label>
          <label>
            Monto solicitado
            <input type="number" required value={monto} onChange={(e) => setMonto(Number(e.target.value))} className="w-full border px-3 py-2 rounded mt-1" />
          </label>
          <label>
            Número de cuotas
            <input type="number" required value={cuotas} onChange={(e) => setCuotas(Number(e.target.value))} className="w-full border px-3 py-2 rounded mt-1" />
          </label>

          <div className="col-span-2 flex justify-between mt-4">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Registrar
            </button>
            <button onClick={onClose} type="button" className="text-gray-600 hover:underline">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioPrestamoModal;
