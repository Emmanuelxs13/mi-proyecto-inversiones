// src/layouts/MainLayout.tsx
// Layout principal que incluye el Sidebar fijo y el área de contenido dinámico usando React Router

import React from "react";
import Sidebar from "../components/Sidebar"; // Importa el sidebar para navegación
import { Outlet } from "react-router-dom"; // Permite cargar dinámicamente la ruta activa

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar visible en todo momento */}
      <Sidebar />

      {/* Contenido principal (dinámico) */}
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <Outlet /> {/* Renderiza la ruta hija activa (páginas como Dashboard, Socios, etc.) */}
      </main>
    </div>
  );
};

export default MainLayout;
