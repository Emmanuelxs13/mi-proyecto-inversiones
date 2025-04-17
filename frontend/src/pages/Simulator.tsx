// Simulator.tsx
// Página del simulador de inversión funcional con validaciones finales y control de errores

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { exportToPDF, exportToCSV } from "../utils/ExportUtils";

const Simulator = () => {
  const [capital, setCapital] = useState<number>(0);
  const [interes, setInteres] = useState<number>(0);
  const [plazo, setPlazo] = useState<number>(0);
  const [tipo, setTipo] = useState<string>("Provisional");

  const [capitalError, setCapitalError] = useState("");
  const [interesError, setInteresError] = useState("");
  const [plazoError, setPlazoError] = useState("");

  const formatoPesos = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
  });

  const formatoNumerico = new Intl.NumberFormat("es-CO");

  let cuotaMensual = 0;
  let totalPagar = 0;
  let ganancia = 0;

  const interesMensual = interes / 12 / 100;

  if (capital > 0 && interes > 0 && plazo > 0) {
    switch (tipo) {
      case "Provisional":
      case "Educativo":
        cuotaMensual = (capital * interesMensual) / (1 - Math.pow(1 + interesMensual, -plazo));
        totalPagar = cuotaMensual * plazo;
        ganancia = totalPagar - capital;
        break;
      case "Rotativo":
        totalPagar = capital + (capital * interesMensual * plazo);
        cuotaMensual = totalPagar / plazo;
        ganancia = totalPagar - capital;
        break;
      case "Fidelidad": {
        const tasaPreferencial = interesMensual * 0.8;
        cuotaMensual = (capital * tasaPreferencial) / (1 - Math.pow(1 + tasaPreferencial, -plazo));
        totalPagar = cuotaMensual * plazo;
        ganancia = totalPagar - capital;
        break;
      }
    }
  }

  const dataGrafica = [
    { name: "Capital", valor: capital },
    { name: "Ganancia", valor: ganancia },
    { name: "Total a pagar", valor: totalPagar },
  ];

  const validar = () => {
    let valido = true;
    if (capital <= 0) {
      setCapitalError("El capital debe ser mayor a 0");
      valido = false;
    }
    if (interes <= 0 || interes > 100) {
      setInteresError("El interés debe ser entre 0.1 y 100");
      valido = false;
    }
    if (plazo <= 0 || plazo > 360) {
      setPlazoError("El plazo debe estar entre 1 y 360 meses");
      valido = false;
    }
    return valido;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-20 px-4 animate-fade-in">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Simulador de Inversión</h2>
            <p className="text-gray-600 mt-2">Calcula tus ganancias estimadas según los parámetros de inversión.</p>
          </div>

          <form className="grid gap-6 sm:grid-cols-2 md:grid-cols-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Capital ($)</label>
              <input
                type="text"
                inputMode="numeric"
                value={capital === 0 ? "" : formatoNumerico.format(capital)}
                onChange={(e) => {
                  const value = e.target.value.replace(/\./g, "").replace(/[^0-9]/g, "");
                  setCapital(Number(value));
                  setCapitalError("");
                }}
                onBlur={() => {
                  if (capital <= 0) setCapitalError("El capital es obligatorio.");
                }}
                placeholder="Ingrese monto"
                className={`mt-1 w-full border ${capitalError ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              {capitalError && <p className="text-red-500 text-sm mt-1">{capitalError}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Interés anual (%)</label>
              <input
                type="text"
                inputMode="numeric"
                value={interes === 0 ? "" : formatoNumerico.format(interes)}
                onChange={(e) => {
                  const value = e.target.value.replace(/\./g, "").replace(/[^0-9]/g, "");
                  setInteres(Number(value));
                  setInteresError("");
                }}
                onBlur={() => {
                  if (interes <= 0) setInteresError("El interés es obligatorio.");
                }}
                placeholder="Ej: 12"
                className={`mt-1 w-full border ${interesError ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              {interesError && <p className="text-red-500 text-sm mt-1">{interesError}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Plazo (meses)</label>
              <input
                type="text"
                inputMode="numeric"
                value={plazo === 0 ? "" : formatoNumerico.format(plazo)}
                onChange={(e) => {
                  const value = e.target.value.replace(/\./g, "").replace(/[^0-9]/g, "");
                  setPlazo(Number(value));
                  setPlazoError("");
                }}
                onBlur={() => {
                  if (plazo <= 0) setPlazoError("El plazo es obligatorio.");
                }}
                placeholder="Ej: 12"
                className={`mt-1 w-full border ${plazoError ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              {plazoError && <p className="text-red-500 text-sm mt-1">{plazoError}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo de crédito</label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Provisional</option>
                <option>Rotativo</option>
                <option>Educativo</option>
                <option>Fidelidad</option>
              </select>
            </div>
          </form>

          {capital > 0 && interes > 0 && plazo > 0 && !capitalError && !interesError && !plazoError && (
            <>
              <div className="mt-12 text-center bg-blue-50 p-6 rounded-md shadow-md">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Resumen del Crédito ({tipo})</h3>
                <p className="text-gray-700">Total a pagar: <strong>{formatoPesos.format(totalPagar)}</strong></p>
                <p className="text-gray-700">Cuota mensual estimada: <strong>{formatoPesos.format(cuotaMensual)}</strong></p>
                <p className="text-gray-700">Ganancia estimada: <strong>{formatoPesos.format(ganancia)}</strong></p>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => exportToPDF(capital, cuotaMensual, totalPagar, ganancia, tipo)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Exportar a PDF
                </button>
                <button
                  onClick={() => exportToCSV(capital, cuotaMensual, totalPagar, ganancia, tipo)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Exportar a CSV
                </button>
              </div>

              <div className="mt-8 bg-white p-6 rounded-md shadow-md">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Visualización en gráfica</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dataGrafica}>
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${(value / 1_000_000).toFixed(1)}M`} />
                    <Tooltip formatter={(value: number) => formatoPesos.format(value)} />
                    <Legend />
                    <Bar dataKey="valor" fill="#3B82F6" radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Simulator;
