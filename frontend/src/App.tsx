import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

// Páginas principales
import Dashboard from "./components/Dashboard";
import Socios from "./pages/Socios";
import Solicitudes from "./pages/Solicitudes";
import Contacto from "./components/Contact";
import Simulator from "./pages/Simulator"; // O como lo tengas nombrado
import HistorialSimulaciones from "./pages/HistorialSimulaciones";
import Estadisticas from "./pages/Estadisticas";
import Prestamos from "./pages/Prestamos";
import AfiliacionForm from "./components/Afiliaciones/AfiliacionForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* Todas las rutas protegidas por el layout con Sidebar */}
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="socios" element={<Socios />} />
          <Route path="solicitudes" element={<Solicitudes />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="simulador" element={<Simulator />} />
          <Route path="historial" element={<HistorialSimulaciones />} />
          <Route path="estadisticas" element={<Estadisticas />} />
          <Route path="prestamos" element={<Prestamos />} />
          <Route path="afiliaciones" element={<AfiliacionForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
