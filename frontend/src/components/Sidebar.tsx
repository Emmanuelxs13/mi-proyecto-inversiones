// Sidebar.tsx
// Barra lateral fija con navegación persistente y estilo oscuro contrastante

import React from "react";
import { Link } from "react-router-dom";
import { Home, Users, FileText, Bell, PhoneCall } from "lucide-react";
// import Logo from "@/assets/logo.svg";

export default function Sidebar() {
  return (
    <aside
      className="fixed left-0 top-0 w-52 h-screen bg-[#1E293B] text-white shadow-lg z-50 flex flex-col justify-between"
    >
      {/* Contenedor principal */}
      <div>
        {/* Logo */}
        <div className="px-6 py-4 border-b border-gray-700 flex items-center gap-2">
          {/* <img src={Logo} alt="Logo" className="w-8 h-8" /> */}
          <h1 className="text-lg font-semibold">Fondo Empleados</h1>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col gap-2 mt-6 px-4">
          <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-600 transition">
            <Home size={18} /> Dashboard
          </Link>
          <Link to="/socios" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-600 transition">
            <Users size={18} /> Socios
          </Link>
          <Link to="/solicitudes" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-600 transition relative">
            <Bell size={18} />
            Solicitudes
            {/* Indicador de notificación (ejemplo estático) */}
            <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </Link>
          <Link to="/historial" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-600 transition">
            <FileText size={18} /> Historial
          </Link>
          <Link to="/contacto" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-600 transition">
            <PhoneCall size={18} /> Contacto
          </Link>
        </nav>
      </div>

      {/* Footer simple */}
      <div className="text-sm text-gray-400 text-center py-4 px-4 border-t border-gray-700">
        © {new Date().getFullYear()} Fondo Botopia
      </div>
    </aside>
  );
}
