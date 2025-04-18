// Hero.tsx
// Componente principal de bienvenida para la landing page
// Prioriza experiencia de usuario, accesibilidad y diseño responsivo

import React from "react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="bg-gradient-to-b from-blue-100 to-white py-36 text-center animate-fade-in"
    >
      <div className="max-w-3xl mx-auto">
        {/* Título principal */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary mb-6">
          Bienvenido al Fondo de Empleados
        </h1>

        {/* Subtítulo explicativo */}
        <p className="text-lg sm:text-xl mb-8">
          Diseña, simula y gestiona tus inversiones con una interfaz sencilla y potente.
        </p>

        {/* Botón de llamado a la acción */}
        <a
          href="#features"
          className="inline-block bg-primary hover:bg-blue-200 text-sky-900 font-medium py-3 px-6 rounded-lg shadow transition duration-300"
        >
          Comenzar ahora
        </a>
      </div>
    </section>
  );
};

export default Hero;
