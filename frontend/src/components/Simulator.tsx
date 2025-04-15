// Simulator.tsx
// Página del simulador con su propio Navbar y formulario visual

import React, { useState } from "react";
import Navbar from "./Navbar";

const Simulator = () => {
  const [capital, setCapital] = useState(0);
  const [interes, setInteres] = useState(0);
  const [plazo, setPlazo] = useState(0);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar para navegación */}
      <Navbar />

      {/* Contenido principal */}
      <section className="py-20 px-4 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Simulador de Inversión</h2>
          <p className="text-gray-600 mt-2">
            Ingresa los datos para calcular tu rentabilidad estimada.
          </p>
        </div>

        {/* Formulario */}
        <form className="max-w-3xl mx-auto grid gap-6 sm:grid-cols-3">
          <div>
            <label htmlFor="capital" className="block text-sm font-medium text-gray-700">
              Capital ($)
            </label>
            <input
              type="number"
              id="capital"
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="interes" className="block text-sm font-medium text-gray-700">
              Tasa de Interés (% anual)
            </label>
            <input
              type="number"
              id="interes"
              value={interes}
              onChange={(e) => setInteres(Number(e.target.value))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="plazo" className="block text-sm font-medium text-gray-700">
              Plazo (meses)
            </label>
            <input
              type="number"
              id="plazo"
              value={plazo}
              onChange={(e) => setPlazo(Number(e.target.value))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </form>

        {/* Mensaje informativo */}
        <div className="max-w-3xl mx-auto mt-12 text-center text-gray-600">
          <p className="italic">Los resultados aparecerán aquí cuando implementemos el cálculo.</p>
        </div>
      </section>
    </div>
  );
};

export default Simulator;
