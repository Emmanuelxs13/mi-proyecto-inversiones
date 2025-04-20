// Sidebar.tsx
// Componente de navegación lateral fijo con enlaces y contador de notificaciones

import React from "react";
import { Link, useLocation } from "react-router-dom"; // Para navegación y resaltar ruta activa
import { FaUsers, FaHome, FaEnvelope } from "react-icons/fa"; // Íconos
import { IoMdNotifications } from "react-icons/io"; // Ícono de notificación

// Número simulado de notificaciones (puedes reemplazarlo luego con datos reales)
const notificacionesSolicitudes = 3;

const Sidebar = () => {
  const location = useLocation(); // Obtiene la ruta actual para resaltarla

  // Componente del ítem del menú
  const NavItem = ({
    to,
    icon,
    label,
    showBadge = false,
  }: {
    to: string;
    icon: JSX.Element;
    label: string;
    showBadge?: boolean;
  }) => (
    <Link
      to={to}
      className={`flex items-center gap-3 p-3 rounded-lg transition ${
        location.pathname === to
          ? "bg-blue-600 text-white"
          : "text-gray-700 hover:bg-blue-100"
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="flex-1 text-sm font-medium">{label}</span>

      {/* Si se debe mostrar notificación */}
      {showBadge && (
        <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
          {notificacionesSolicitudes}
        </span>
      )}
    </Link>
  );

  return (
    <aside className="w-64 min-h-screen bg-white border-r shadow-sm fixed top-0 left-0 z-40">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-blue-600">Fondo Empleados</h1>
      </div>

      <nav className="p-4 space-y-2">
        <NavItem to="/dashboard" icon={<FaHome />} label="Dashboard" />
        <NavItem to="/socios" icon={<FaUsers />} label="Socios" />
        <NavItem
          to="/solicitudes"
          icon={<IoMdNotifications />}
          label="Solicitudes"
          showBadge
        />
        <NavItem to="/contacto" icon={<FaEnvelope />} label="Contacto" />
      </nav>
    </aside>
  );
};

export default Sidebar;
