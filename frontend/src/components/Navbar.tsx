// Navbar.tsx
// Encabezado fijo y responsive con navegación clara y experiencia optimizada
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  // Estado para controlar la visibilidad del menú en móviles
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-700 tracking-tight">
          Fondo de Empleados
        </h1>

        {/* Menú hamburguesa visible solo en móvil */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-blue-700 focus:outline-none"
          aria-label="Abrir menú"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Menú en escritorio */}
        <nav className="hidden md:flex space-x-10">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
          >
            Inicio
          </Link>
          <Link
            to="/estadisticas"
            className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
          >
            Estadísticas
          </Link>
          <Link
            to="/simulador"
            className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
          >
            Simulador
          </Link>
          <Link
            to="/historial"
            className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
          >
            Historial
          </Link>

          <Link
            to="/socios"
            className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
          >
            Socios
          </Link>
          <Link
            to="/solicitudes"
            className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
          >
            Solicitudes
          </Link>
          <Link
              to="/contacto"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
            >
              Contacto
            </Link>
        </nav>
      </div>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 bg-white shadow-inner">
          <nav className="flex flex-col space-y-4 text-center">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Inicio
            </Link>
            <Link
              to="/estadisticas"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Estadisticas
            </Link>
            <Link
              to="/simulador"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Simulador
            </Link>
            <Link
              to="/historial"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Historial
            </Link>
            <Link
              to="/socios"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Socios
            </Link>
            <Link
              to="/solicitudes"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Solicitudes
            </Link>
            <Link
              to="/contacto"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Contacto
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
