// src/pages/Estadisticas.tsx
import React from "react";
import Navbar from "../components/Navbar";

const Estadisticas = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-20 px-4 max-w-6xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold text-blue-700 mb-10 text-center">
          Estadísticas Globales
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Métrica 1 */}
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg text-center shadow">
            <h3 className="text-xl font-semibold text-blue-600">Socios Activos</h3>
            <p className="text-3xl font-bold mt-2">1,258</p>
          </div>

          {/* Métrica 2 */}
          <div className="bg-green-50 border border-green-100 p-6 rounded-lg text-center shadow">
            <h3 className="text-xl font-semibold text-green-600">Créditos Vigentes</h3>
            <p className="text-3xl font-bold mt-2">462</p>
          </div>

          {/* Métrica 3 */}
          <div className="bg-yellow-50 border border-yellow-100 p-6 rounded-lg text-center shadow">
            <h3 className="text-xl font-semibold text-yellow-600">Fondos Disponibles</h3>
            <p className="text-3xl font-bold mt-2">$3.540M</p>
          </div>

          {/* Métrica 4 */}
          <div className="bg-purple-50 border border-purple-100 p-6 rounded-lg text-center shadow">
            <h3 className="text-xl font-semibold text-purple-600">Rendimientos Generados</h3>
            <p className="text-3xl font-bold mt-2">$920M</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Estadisticas;
