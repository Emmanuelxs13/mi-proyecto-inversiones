// Simulator.tsx
// Página del simulador de inversión funcional con Navbar, cálculos específicos por tipo de crédito, formato de moneda y visualización de resultados con gráficas

import React, { useState } from "react"; // Importa React y el hook useState
import Navbar from "./Navbar"; // Importa el componente de navegación
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"; // Importa componentes de Recharts para la visualización de datos

const Simulator = () => {
  // Definición de estados para los inputs del formulario
  const [capital, setCapital] = useState<number>(0); // Monto inicial del crédito
  const [interes, setInteres] = useState<number>(0); // Tasa de interés anual en porcentaje
  const [plazo, setPlazo] = useState<number>(0); // Plazo del crédito en meses
  const [tipo, setTipo] = useState<string>("Provisional"); // Tipo de crédito seleccionado

  // Estados para manejar errores de validación
  const [capitalError, setCapitalError] = useState(false);
  const [interesError, setInteresError] = useState(false);
  const [plazoError, setPlazoError] = useState(false);

  // Formateador de moneda en pesos colombianos (COP)
  const formatoPesos = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
  });

  // Formateador para mostrar números con separadores de miles sin el símbolo de peso
  const formatoNumerico = new Intl.NumberFormat("es-CO");

  // Variables donde se almacenarán los resultados
  let cuotaMensual = 0;
  let totalPagar = 0;
  let ganancia = 0;

  // Se convierte la tasa de interés anual a tasa mensual decimal
  const interesMensual = interes / 12 / 100;

  // Se realizan los cálculos si todos los campos tienen valores válidos
  if (capital > 0 && interes > 0 && plazo > 0) {
    switch (tipo) {
      case "Provisional":
        cuotaMensual = (capital * interesMensual) / (1 - Math.pow(1 + interesMensual, -plazo));
        totalPagar = cuotaMensual * plazo;
        ganancia = totalPagar - capital;
        break;
      case "Rotativo":
        totalPagar = capital + (capital * interesMensual * plazo);
        cuotaMensual = totalPagar / plazo;
        ganancia = totalPagar - capital;
        break;
      case "Educativo":
        cuotaMensual = (capital * interesMensual) / (1 - Math.pow(1 + interesMensual, -plazo));
        totalPagar = cuotaMensual * plazo;
        ganancia = totalPagar - capital;
        break;
      case "Fidelidad": {
        const tasaPreferencial = interesMensual * 0.8; // 20% de descuento en la tasa de interés
        cuotaMensual = (capital * tasaPreferencial) / (1 - Math.pow(1 + tasaPreferencial, -plazo));
        totalPagar = cuotaMensual * plazo;
        ganancia = totalPagar - capital;
        break;
      }
    }
  }

  // Se preparan los datos para alimentar la gráfica de resultados
  const dataGrafica = [
    { name: "Capital", valor: capital },
    { name: "Ganancia", valor: ganancia },
    { name: "Total a pagar", valor: totalPagar },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar /> {/* Muestra la barra de navegación */}

      <section className="py-20 px-4 animate-fade-in">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Simulador de Inversión</h2>
            <p className="text-gray-600 mt-2">Calcula tus ganancias estimadas según los parámetros de inversión.</p>
          </div>

          {/* Formulario de entrada de datos */}
          <form className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {/* Campo para ingresar el capital */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Capital ($)</label>
              <input
                type="text"
                inputMode="numeric"
                value={capital === 0 ? "" : formatoNumerico.format(capital)} // Visualiza con formato de miles
                onChange={(e) => {
                  const value = e.target.value.replace(/\./g, "").replace(/[^0-9]/g, "");
                  setCapital(Number(value));
                  setCapitalError(false);
                }}
                onBlur={() => {
                  if (capital <= 0) setCapitalError(true);
                }}
                placeholder="Ingrese monto"
                className={`mt-1 w-full border ${capitalError ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              {capitalError && <p className="text-red-500 text-sm mt-1">El capital es obligatorio.</p>}
            </div>

            {/* Campo para ingresar la tasa de interés */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Interés anual (%)</label>
              <input
                type="text"
                inputMode="numeric"
                value={interes === 0 ? "" : formatoNumerico.format(interes)}
                onChange={(e) => {
                  const value = e.target.value.replace(/\./g, "").replace(/[^0-9]/g, "");
                  setInteres(Number(value));
                  setInteresError(false);
                }}
                onBlur={() => {
                  if (interes <= 0) setInteresError(true);
                }}
                placeholder="Ej: 12"
                className={`mt-1 w-full border ${interesError ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              {interesError && <p className="text-red-500 text-sm mt-1">El interés es obligatorio.</p>}
            </div>

            {/* Campo para ingresar el plazo en meses */}
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
                onBlur={() => {
                  if (plazo <= 0) setPlazoError(true);
                }}
                placeholder="Ej: 12"
                className={`mt-1 w-full border ${plazoError ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              {plazoError && <p className="text-red-500 text-sm mt-1">El plazo es obligatorio.</p>}
            </div>

            {/* Selector para el tipo de crédito */}
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

          {/* Resultados si hay datos válidos */}
          {capital > 0 && interes > 0 && plazo > 0 && (
            <>
              <div className="mt-12 text-center bg-blue-50 p-6 rounded-md shadow-md">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Resumen del Crédito ({tipo})</h3>
                <p className="text-gray-700">Total a pagar: <strong>{formatoPesos.format(totalPagar)}</strong></p>
                <p className="text-gray-700">Cuota mensual estimada: <strong>{formatoPesos.format(cuotaMensual)}</strong></p>
                <p className="text-gray-700">Ganancia estimada: <strong>{formatoPesos.format(ganancia)}</strong></p>
              </div>

              {/* Sección de gráfica usando Recharts */}
              <div className="mt-8 bg-white p-6 rounded-md shadow-md">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Visualización en gráfica</h4>
                {/* Contenedor adaptable */}
                <ResponsiveContainer width="100%" height={300}> 
                  <BarChart data={dataGrafica}> {/* Componente de gráfico de barras */}
                    <XAxis dataKey="name" /> {/* Eje X con nombres */}
                    <YAxis tickFormatter={(value) => `$${(value / 1_000_000).toFixed(1)}M`} /> {/* Eje Y formateado en millones */}
                    <Tooltip formatter={(value: number) => formatoPesos.format(value)} /> {/* Tooltip con valores formateados */}
                    <Legend /> {/* Leyenda del gráfico */}
                    <Bar dataKey="valor" fill="#3B82F6" radius={[5, 5, 0, 0]} /> {/* Barra con color y esquinas redondeadas */}
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