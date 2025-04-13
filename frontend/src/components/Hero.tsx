// Hero.tsx
// Componente visual principal de bienvenida con título y botón CTA

const Hero = () => {
    return (
      <section
        id="hero"
        className="bg-gradient-to-b from-blue-100 to-white py-20 text-center"
      >
        <div className="max-w-3xl mx-auto px-4">
          {/* Título principal */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-6">
            Bienvenido a Inversiones J.A
          </h1>
  
          {/* Subtítulo */}
          <p className="text-gray-700 text-lg mb-8">
            Tu simulador de inversión confiable y fácil de usar.
          </p>
  
          {/* Botón de acción */}
          <a
            href="#features"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Explorar beneficios
          </a>
        </div>
      </section>
    );
  };
  
  export default Hero;
  