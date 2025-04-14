// Importamos los componentes principales que conforman la Landing Page
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
//import Features from "./components/Features";
//import Footer from "./components/Footer";

// Página principal de la aplicación (Landing Page)
const Home = () => {
  return (
    // Contenedor principal de la página con layout en columna y altura mínima igual a la pantalla
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Encabezado de navegación */}
      <Navbar />

      {/* Sección Hero (bienvenida visual) */}
      <Hero /> 

      {/* Sección de características o beneficios */}
      {/* <Features /> */}

      {/* Pie de página */}
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
