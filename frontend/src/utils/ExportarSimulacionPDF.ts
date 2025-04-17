// 🚀 ExportarSimulacionPDF.ts (archivo auxiliar opcional si deseas separar lógica)
// Utiliza jsPDF para generar un PDF con los resultados de la simulación

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportarSimulacionPDF = (datos: {
  tipo: string;
  capital: number;
  interes: number;
  plazo: number;
  cuotaMensual: number;
  totalPagar: number;
  ganancia: number;
}) => {
  const doc = new jsPDF();
  const formatoPesos = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
  });

  doc.setFontSize(18);
  doc.text("Resumen de Simulación de Inversión", 20, 20);

  // Tabla de resumen
  autoTable(doc, {
    startY: 30,
    head: [["Parámetro", "Valor"]],
    body: [
      ["Tipo de crédito", datos.tipo],
      ["Capital", formatoPesos.format(datos.capital)],
      ["Interés anual", `${datos.interes}%`],
      ["Plazo (meses)", datos.plazo],
      ["Cuota mensual", formatoPesos.format(datos.cuotaMensual)],
      ["Total a pagar", formatoPesos.format(datos.totalPagar)],
      ["Ganancia", formatoPesos.format(datos.ganancia)],
    ],
  });

  // Guarda el archivo
  doc.save(`Simulacion_${datos.tipo}.pdf`);
};
