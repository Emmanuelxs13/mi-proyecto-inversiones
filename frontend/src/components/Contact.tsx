// src/pages/Contacto.tsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contacto = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Contáctanos</h1>
        <form className="grid gap-6 bg-gray-50 p-8 rounded-lg shadow-md">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tu nombre completo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="tucorreo@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mensaje</label>
            <textarea
              rows={5}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Escribe tu mensaje aquí..."
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Enviar mensaje
            </button>
          </div>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default Contacto;
