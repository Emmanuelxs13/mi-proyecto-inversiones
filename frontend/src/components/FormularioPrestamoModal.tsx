import React, { useEffect, useState } from "react";

interface TipoPrestamo {
  id: number;
  nombre: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const formatoPesos = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 2,
});

const formatoNumerico = new Intl.NumberFormat("es-CO");

const FormularioPrestamoModal = ({ visible, onClose, onSuccess }: Props) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [foto, setFoto] = useState("");
  const [tipoPrestamo, setTipoPrestamo] = useState<number>(0);
  const [monto, setMonto] = useState<number>(0);
  const [cuotas, setCuotas] = useState<number>(6);
  const [tipos, setTipos] = useState<TipoPrestamo[]>([]);
  const [mensaje, setMensaje] = useState<string | null>(null);

  // Cargar tipos de préstamo
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tipos-prestamos`)
      .then((res) => res.json())
      .then(setTipos)
      .catch((error) => console.error("Error al cargar tipos:", error));
  }, []);

  // Validación de email
  const esCorreoValido = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || nombre.trim().length < 3) {
      setMensaje(
        "❌ El nombre es obligatorio y debe tener al menos 3 caracteres."
      );
      return;
    }

    if (!correo || !esCorreoValido(correo)) {
      setMensaje("❌ El correo electrónico es obligatorio y debe ser válido.");
      return;
    }

    if (!telefono.match(/^[0-9]{7,15}$/)) {
      setMensaje("❌ El teléfono debe tener entre 7 y 15 dígitos.");
      return;
    }

    if (!direccion || direccion.trim().length < 5) {
      setMensaje("❌ La dirección es obligatoria y debe ser más detallada.");
      return;
    }

    if (!tipoPrestamo || tipoPrestamo === 0) {
      setMensaje("❌ Selecciona un tipo de préstamo.");
      return;
    }

    if (monto <= 0 || cuotas <= 0) {
      setMensaje("❌ El monto y las cuotas deben ser mayores a cero.");
      return;
    }

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/prestamos/crear-prestamo-completo`,
        {
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
        }
      );

      if (!res.ok) throw new Error("Error al registrar préstamo");

      setMensaje("✅ Préstamo registrado con éxito.");
      onSuccess();
      setTimeout(() => {
        setMensaje(null);
        onClose();
      }, 2000);
    } catch (error) {
      console.error(error);
      setMensaje("❌ No se pudo registrar el préstamo.");
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-xl">
        <h2 className="text-lg font-bold mb-4 text-blue-700">
          Registrar Préstamo y Socio
        </h2>

        {mensaje && (
          <div
            className={`text-sm mb-3 text-center ${
              mensaje.includes("✅") ? "text-green-700" : "text-red-600"
            }`}
          >
            {mensaje}
          </div>
        )}

        <form onSubmit={manejarSubmit} className="grid grid-cols-2 gap-4">
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre completo *"
            required
            className="col-span-2 border px-3 py-2 rounded"
          />
          <input
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Correo electrónico *"
            required
            className="col-span-2 border px-3 py-2 rounded"
            type="email"
          />
          <input
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Teléfono *"
            required
            className="border px-3 py-2 rounded"
          />
          <input
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Dirección *"
            required
            className="border px-3 py-2 rounded"
          />
          <input
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
            placeholder="URL de foto"
            className="col-span-2 border px-3 py-2 rounded"
          />

          <select
            value={tipoPrestamo}
            onChange={(e) => setTipoPrestamo(Number(e.target.value))}
            required
            className="col-span-2 border px-3 py-2 rounded"
          >
            <option value={0} disabled>
              Seleccione un tipo de préstamo *
            </option>
            {tipos.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombre}
              </option>
            ))}
          </select>

          <input
            type="text"
            inputMode="numeric"
            value={formatoNumerico.format(monto)}
            onChange={(e) => {
              const valor = e.target.value.replace(/\D/g, ""); // Solo dígitos
              const limpio = valor.replace(/^0+/, ""); // Quita ceros a la izquierda
              setMonto(Number(limpio));
            }}
            placeholder="Monto solicitado *"
            required
            className="border px-3 py-2 rounded"
          />

          {/* CUOTAS con formato de miles */}
          <input
            type="text"
            inputMode="numeric"
            value={formatoNumerico.format(cuotas)}
            onChange={(e) => {
              const valor = e.target.value.replace(/\D/g, "");
              const limpio = valor.replace(/^0+/, "");
              setCuotas(Number(limpio));
            }}
            placeholder="Cantidad de cuotas *"
            required
            className="border px-3 py-2 rounded"
          />

          {/* Vista previa formateada */}
          <div className="col-span-2 text-sm text-gray-600 mt-2">
            {monto > 0 && (
              <p>
                <strong>Monto:</strong> {formatoPesos.format(monto)}
              </p>
            )}
            {cuotas > 0 && (
              <p>
                <strong>Cuotas:</strong> {formatoNumerico.format(cuotas)}
              </p>
            )}
          </div>

          <div className="col-span-2 flex justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Registrar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:underline"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioPrestamoModal;
