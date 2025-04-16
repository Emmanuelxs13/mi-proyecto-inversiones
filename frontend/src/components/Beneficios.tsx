// src/components/Beneficios.tsx
// Componente de página completa que muestra beneficios del fondo de empleados

import React from "react";
import Navbar from "./Navbar";

const Beneficios = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="py-16 px-6 max-w-5xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold text-blue-700 mb-8">Beneficios para nuestros Asociados</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">Créditos Preferenciales</h2>
            <p className="text-sm text-gray-600">
              Accede a líneas de crédito con tasas más bajas y procesos ágiles según tu fidelidad y aportes.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">Apoyo Educativo</h2>
            <p className="text-sm text-gray-600">
              Financiamiento para estudios técnicos, tecnológicos, pregrados o posgrados con convenios educativos.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">Bienestar y Recreación</h2>
            <p className="text-sm text-gray-600">
              Actividades culturales, recreativas y descuentos especiales para nuestros asociados y sus familias.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Beneficios;
