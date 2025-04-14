// Features.tsx
// Sección de beneficios o características destacadas del sistema
// Priorizando claridad, accesibilidad y estructura responsive para una mejor UX

import React from "react";

const Features = () => {
  const beneficios = [
    {
      titulo: "Simulador Financiero",
      descripcion:
        "Calcula posibles rendimientos y compara escenarios de inversión en tiempo real.",
      icono: "💹",
    },
    {
      titulo: "Gestor de Portafolios",
      descripcion:
        "Organiza tus activos, asigna porcentajes y visualiza tu crecimiento.",
      icono: "📊",
    },
    {
      titulo: "Interfaz Intuitiva",
      descripcion:
        "Diseñada para usuarios con y sin experiencia en inversiones.",
      icono: "🧠",
    },
  ];

  return (
    <section id="features" className="bg-neutral py-16 px-4 text-center">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-10">
          Beneficios de usar el Fondo de Inversiones
        </h2>

        {/* Lista de beneficios */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {beneficios.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 shadow hover:shadow-md transition text-left"
            >
              <div className="text-4xl mb-4">{item.icono}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.titulo}
              </h3>
              <p className="text-gray-600">{item.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
