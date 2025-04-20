import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { exportToPDF, exportToCSV } from "../utils/ExportUtils";

const Simulator = () => {
  const [capital, setCapital] = useState<number>(0);
  const [interes, setInteres] = useState<number>(0);
  const [plazo, setPlazo] = useState<number>(0);
  const [tipo, setTipo] = useState<string>("Provisional");

  const [capitalError, setCapitalError] = useState(false);
  const [interesError, setInteresError] = useState(false);
  const [plazoError, setPlazoError] = useState(false);

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
        break;
      case "Rotativo":
        totalPagar = capital + (capital * interesMensual * plazo);
        cuotaMensual = totalPagar / plazo;
        break;
      case "Fidelidad":{
        const tasaPreferencial = interesMensual * 0.8;
        cuotaMensual = (capital * tasaPreferencial) / (1 - Math.pow(1 + tasaPreferencial, -plazo));
        break;
      }
    }
    totalPagar = cuotaMensual * plazo;
    ganancia = totalPagar - capital;
  }

  const dataGrafica = [
    { name: "Capital", valor: capital },
    { name: "Ganancia", valor: ganancia },
    { name: "Total a pagar", valor: totalPagar },
  ];

  return (
    <div className="min-h-screen bg-white pl-48 pr-6 py-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Simulador de Inversión</h2>
          <p className="text-gray-600">Calcula tu crédito según el tipo, monto e interés.</p>
        </div>

        {/* Formulario */}
        <form className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Capital ($)</label>
            <input
              type="text"
              inputMode="numeric"
              value={capital === 0 ? "" : formatoNumerico.format(capital)}
              onChange={(e) => {
                const value = e.target.value.replace(/\./g, "").replace(/[^0-9]/g, "");
                setCapital(Number(value));
                setCapitalError(false);
              }}
              onBlur={() => capital <= 0 && setCapitalError(true)}
              className={`mt-1 w-full border ${
                capitalError ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2`}
            />
            {capitalError && <p className="text-red-500 text-sm">Requerido.</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Interés (%)</label>
            <input
              type="text"
              inputMode="numeric"
              value={interes === 0 ? "" : formatoNumerico.format(interes)}
              onChange={(e) => {
                const value = e.target.value.replace(/\./g, "").replace(/[^0-9]/g, "");
                setInteres(Number(value));
                setInteresError(false);
              }}
              onBlur={() => interes <= 0 && setInteresError(true)}
              className={`mt-1 w-full border ${
                interesError ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2`}
            />
            {interesError && <p className="text-red-500 text-sm">Requerido.</p>}
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
                setPlazoError(false);
              }}
              onBlur={() => plazo <= 0 && setPlazoError(true)}
              className={`mt-1 w-full border ${
                plazoError ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2`}
            />
            {plazoError && <p className="text-red-500 text-sm">Requerido.</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option>Provisional</option>
              <option>Rotativo</option>
              <option>Educativo</option>
              <option>Fidelidad</option>
            </select>
          </div>
        </form>

        {/* Resultados */}
        {capital > 0 && interes > 0 && plazo > 0 && (
          <>
            <div className="bg-blue-50 p-6 rounded-md shadow mb-6 text-center">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Resumen del Crédito</h3>
              <p>Total a pagar: <strong>{formatoPesos.format(totalPagar)}</strong></p>
              <p>Cuota mensual: <strong>{formatoPesos.format(cuotaMensual)}</strong></p>
              <p>Ganancia: <strong>{formatoPesos.format(ganancia)}</strong></p>
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={() => exportToPDF(capital, cuotaMensual, totalPagar, ganancia, tipo)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Exportar PDF
              </button>
              <button
                onClick={() => exportToCSV(capital, cuotaMensual, totalPagar, ganancia, tipo)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Exportar CSV
              </button>
            </div>

            {/* Gráfica */}
            <div className="bg-white border rounded-md shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Visualización</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dataGrafica}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => formatoPesos.format(value)} />
                  <Legend />
                  <Bar dataKey="valor" fill="#3B82F6" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Simulator;
