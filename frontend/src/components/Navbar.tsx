// Navbar.tsx
// Encabezado fijo y responsive con navegación clara y experiencia optimizada

import { useState } from "react";

const Navbar = () => {
  // Estado para controlar la visibilidad del menú en móviles
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-700 tracking-tight">
          Inversiones J.A
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
          <a
            href="#hero"
            className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
          >
            Inicio
          </a>
          <a
            href="#features"
            className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
          >
            Beneficios
          </a>
          <a
            href="#contact"
            className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
          >
            Contacto
          </a>
        </nav>
      </div>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 bg-white shadow-inner">
          <nav className="flex flex-col space-y-4 text-center">
            <a
              href="#hero"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Inicio
            </a>
            <a
              href="#features"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Beneficios
            </a>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Contacto
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
