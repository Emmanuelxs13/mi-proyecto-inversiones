import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { useState } from "react";

interface FormData {
  nombre: string;
  correo: string;
  password: string;
}

const CrearRegistro = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      const res = await registerUser(data.nombre, data.correo, data.password);
      setSuccess(res.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrar usuario.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-blue-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Crear cuenta</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre completo</label>
            <input
              {...register("nombre", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Juan Pérez"
            />
            {errors.nombre && <p className="text-red-500 text-sm mt-1">Campo obligatorio</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Correo</label>
            <input
              {...register("correo", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              placeholder="correo@ejemplo.com"
            />
            {errors.correo && <p className="text-red-500 text-sm mt-1">Campo obligatorio</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">Mínimo 6 caracteres</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-primary-darker hover:bg-primary-darkest text-white py-2 rounded-lg transition"
          >
            Registrarme
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          ¿Ya tienes cuenta?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
};

export default CrearRegistro;
