// Footer.tsx
// Pie de página con información institucional y enlaces rápidos
// Diseño limpio, accesible y centrado en experiencia de usuario

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8 px-4 text-center border-t">
      <div className="max-w-4xl mx-auto">
        {/* Nombre o logo */}
        <h2 className="text-lg font-bold text-primary">Fondo de Empleados</h2>

        {/* Texto legal */}
        <p className="text-sm mt-2">&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>

        {/* Enlaces rápidos (anclas internas) */}
        <nav className="mt-4 flex justify-center gap-6 text-sm">
          <a href="#hero" className="hover:text-blue-600 transition">Inicio</a>
          <a href="#features" className="hover:text-blue-600 transition">Beneficios</a>
          <a href="#contact" className="hover:text-blue-600 transition">Contacto</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
