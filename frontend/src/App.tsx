// App.tsx
// Archivo principal de la aplicación donde se definen las rutas de navegación.
// Utiliza React Router para mostrar diferentes vistas según la URL actual.

// Importamos componentes necesarios de React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importamos las páginas o vistas que vamos a mostrar en distintas rutas
import Home from "./pages/Home"; // Página principal o landing page
import Simulator from "./pages/Simulator"; // Página del simulador (vista independiente)
import Socios from "./pages/Socios";
import Beneficios from "./components/Beneficios";
import HistorialSimulaciones from "./pages/HistorialSimulaciones";
import Contacto from "./components/Contact";
import Estadisticas from "./pages/Estadisticas";
import Solicitudes from "./pages/Solicitudes";

function App() {
  return (
    // <Router>: Componente que permite manejar las rutas de la app desde el navegador
    <Router>
      {/* <Routes>: Contenedor de todas las rutas disponibles */}
      <Routes>
        {/* Ruta para el inicio ("/"). Muestra el componente Home */}
        <Route path="/" element={<Home />} />

        {/* Ruta para "/simulador". Muestra únicamente el componente Simulator */}
        <Route path="/simulador" element={<Simulator />} />
        <Route path="/socios" element={<Socios />} />
        <Route path="/beneficios" element={<Beneficios />} />
        <Route path="/historial" element={<HistorialSimulaciones />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
      </Routes>
    </Router>
  );
}

// Exportamos el componente App para que sea usado en el punto de entrada (main.tsx)
export default App;
