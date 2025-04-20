// src/components/Sidebar.tsx

import { Link } from "react-router-dom"; // Importa Link para navegación interna
import { Home, Users, FileText, Bell } from "lucide-react"; // Iconos del sidebar
// import Logo from "@/assets/logo.svg"; // Logo de la app (ajusta si es otro archivo)

export default function Sidebar() {
  return (
    // Contenedor principal del sidebar con fondo primario oscuro
    <aside className="h-screen w-64 bg-primary-darkest text-background-light flex flex-col shadow-lg">
      
      {/* Sección del logo */}
      <div className="p-6 flex items-center gap-3 border-b border-primary-darker">
        {/* <img src={Logo} alt="Logo" className="h-10 w-auto" /> */}
        <span className="text-xl font-bold">Inversiones</span>
      </div>

      {/* Navegación principal */}
      <nav className="flex-1 p-4">
        <ul className="space-y-3">

          {/* Opción: Inicio */}
          <li>
            <Link to="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary transition">
              <Home className="w-5 h-5" />
              <span className="font-medium">Inicio</span>
            </Link>
          </li>

          {/* Opción: Socios */}
          <li>
            <Link to="/socios" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary transition">
              <Users className="w-5 h-5" />
              <span className="font-medium">Socios</span>
            </Link>
          </li>

          {/* Opción: Solicitudes */}
          <li>
            <Link to="/solicitudes" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary transition">
              <FileText className="w-5 h-5" />
              <span className="font-medium">Solicitudes</span>
            </Link>
          </li>

          {/* Opción: Notificaciones */}
          <li>
            <Link to="/notificaciones" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary transition relative">
              <Bell className="w-5 h-5" />
              <span className="font-medium">Notificaciones</span>
              
              {/* Contador de notificaciones */}
              <span className="absolute right-3 top-2 bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full">
                3
              </span>
            </Link>
          </li>

        </ul>
      </nav>
    </aside>
  );
}
