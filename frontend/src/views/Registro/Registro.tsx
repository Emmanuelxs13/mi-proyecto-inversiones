import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

interface FormData {
  nombre: string;
  correo: string;
  password: string;
}

const Registro = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post("http://localhost:3000/api/auth/register", data);
      setMensaje("Cuenta creada con éxito. Redirigiendo...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setMensaje(err.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Crear cuenta</h2>

        {mensaje && <p className="text-center mb-4 text-sm text-blue-600">{mensaje}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-1">Nombre completo</label>
            <input
              {...register("nombre", { required: true })}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
              placeholder="Juan Pérez"
            />
            {errors.nombre && <p className="text-red-500 text-xs mt-1">Este campo es obligatorio</p>}
          </div>

          <div>
            <label className="block mb-1">Correo electrónico</label>
            <input
              {...register("correo", { required: true })}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
              type="email"
              placeholder="correo@ejemplo.com"
            />
            {errors.correo && <p className="text-red-500 text-xs mt-1">Este campo es obligatorio</p>}
          </div>

          <div>
            <label className="block mb-1">Contraseña</label>
            <input
              {...register("password", { required: true })}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
              type="password"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">Este campo es obligatorio</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
