// src/views/Login/Login.tsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { saveAuthData } from "../../utils/authUtils";
import { useState } from "react";

interface FormData {
  correo: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      const res = await login(data.correo, data.password);
      saveAuthData(res.token, res.user);
      res.user.rol === "admin"
        ? navigate("/dashboard")
        : navigate("/usuario/inicio");
    } catch (err: any) {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-blue-100 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden">
        <div className="px-8 py-10">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
            Iniciar sesión en <span className="text-blue-500">FEINPEC</span>
          </h2>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                {...register("correo", { required: true })}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                type="email"
                placeholder="usuario@correo.com"
              />
              {errors.correo && <p className="text-red-500 text-xs mt-1">Campo requerido</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                {...register("password", { required: true })}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                type="password"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">Campo requerido</p>}
            </div>

            <div className="flex justify-between items-center text-sm">
              <button
                type="button"
                onClick={() => navigate("/recuperar")}
                className="text-blue-600 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
              <button
                type="button"
                onClick={() => navigate("/registro")}
                className="text-blue-600 hover:underline"
              >
                Crear cuenta
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
        <div className="bg-blue-600 text-white text-center py-3 text-sm">
          © {new Date().getFullYear()} Fondo de Empleados FEINPEC
        </div>
      </div>
    </div>
  );
};

export default Login;
