import React from "react";
import AfiliacionForm from "../../components/Afiliaciones/AfiliacionForm";

/**
 * Página principal que muestra el formulario de afiliación paso a paso.
 * Incluye título, estilos y centra visualmente el formulario.
 */
const AfiliacionesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">
            Formulario de Afiliación
          </h1>
          <AfiliacionForm />
        </div>
      </div>
    </div>
  );
};

export default AfiliacionesPage;
