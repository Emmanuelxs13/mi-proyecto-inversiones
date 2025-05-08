// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import AdminLayout from "./layouts/AdminLayout"; // Layout para el administrador

// Login
import Login from "./views/login/Login";

// Vistas del admin
import Dashboard from "./views/Admin/Dashboard";
import Socios from "./views/Admin/Socios";
import Solicitudes from "./views/Admin/Solicitudes";
// import Contacto from "./views/Usuario/Contact"; // Cambiado a Usuario/Contacto para mantener la estructura
import Simulador from "./views/Admin/Simulator";
import HistorialSimulaciones from "./views/Admin/HistorialSimulaciones";
import Estadisticas from "./views/Admin/Estadisticas";
// import Prestamos from "./views/Usuario/Prestamos"; //El usuario debe llenar un formulario similar al de afiliación para solicitar un prestamo
// import Afiliaciones from "./views/Usuario/Afiliaciones";

// (Opcional para usuarios normales en el futuro)
// import UsuarioInicio from "./views/Usuario/Inicio";

function App() {
  return (
    <Router>
      <Routes>
        {/* Página pública */}
        <Route path="/login" element={<Login />} />

        {/* Redirección base */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* Rutas protegidas por el layout del administrador */}
        <Route path="/" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="socios" element={<Socios />} />
          <Route path="solicitudes" element={<Solicitudes />} />
          {/* <Route path="contacto" element={<Contacto />} /> */}
          <Route path="simulador" element={<Simulador />} />
          <Route path="historial" element={<HistorialSimulaciones />} />
          <Route path="estadisticas" element={<Estadisticas />} />
          {/* <Route path="prestamos" element={<Prestamos />} /> */}
          {/* <Route path="afiliaciones" element={<Afiliaciones />} /> */}
        </Route>

        {/* Rutas para usuario normal - más adelante
        <Route path="/usuario" element={<UserLayout />}>
          <Route path="inicio" element={<UsuarioInicio />} />
        </Route>
        */}
      </Routes>
    </Router>
  );
}

export default App;
