// ExportUtils.ts
// Funciones para exportar los resultados del simulador a PDF y CSV

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Formateador para COP
const formatoPesos = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 2,
});

// Formateador plano para CSV (sin símbolo de moneda ni separadores de miles)
const formatoCSV = (valor: number) => valor.toFixed(2).replace('.', ',');

// Función para exportar a PDF
export const exportToPDF = (capital: number, cuota: number, total: number, ganancia: number, tipo: string) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(`Resumen de Crédito - Tipo: ${tipo}`, 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [['Detalle', 'Valor']],
    body: [
      ['Capital Inicial', formatoPesos.format(capital)],
      ['Cuota Mensual', formatoPesos.format(cuota)],
      ['Total a Pagar', formatoPesos.format(total)],
      ['Ganancia', formatoPesos.format(ganancia)],
    ],
  });

  doc.save(`simulador-${tipo}.pdf`);
};

// Función para exportar a CSV sin caracteres especiales
export const exportToCSV = (capital: number, cuota: number, total: number, ganancia: number, tipo: string) => {
  const rows = [
    ['Detalle', 'Valor (COP)'],
    ['Capital Inicial', formatoCSV(capital)],
    ['Cuota Mensual', formatoCSV(cuota)],
    ['Total a Pagar', formatoCSV(total)],
    ['Ganancia', formatoCSV(ganancia)],
  ];

  const csvContent = rows.map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `simulador-${tipo}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
