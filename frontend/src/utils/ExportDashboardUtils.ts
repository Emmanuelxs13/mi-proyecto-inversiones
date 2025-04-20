// ExportDashboardUtils.ts
// Funciones para exportar estadísticas del dashboard a PDF y CSV

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Función para exportar métricas y gráficas a PDF
export const exportDashboardToPDF = (metricas: any, barras: any[], torta: any[]) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Resumen Estadístico del Dashboard", 14, 20);

  // Sección de Métricas clave
  autoTable(doc, {
    startY: 30,
    head: [["Métrica", "Valor"]],
    body: [
      ["Fondos disponibles", `$${metricas.fondos.toLocaleString("es-CO")}`],
      ["Socios activos", metricas.socios],
      ["Créditos vigentes", metricas.creditos],
      ["Rendimientos", `$${metricas.rendimientos.toLocaleString("es-CO")}`],
    ],
  });

  // Datos de la gráfica de barras
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Mes", "Ingresos", "Egresos"]],
    body: barras.map((d) => [d.name, `$${d.ingresos.toLocaleString("es-CO")}`, `$${d.egresos.toLocaleString("es-CO")}`]),
  });

  // Datos de la gráfica de torta
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Tipo de Crédito", "Porcentaje"]],
    body: torta.map((d) => [d.name, `${d.valor}%`]),
  });

  doc.save("dashboard-estadisticas.pdf");
};

// Función para exportar a CSV
export const exportDashboardToCSV = (metricas: any, barras: any[], torta: any[]) => {
  const rows = [
    ["Métrica", "Valor"],
    ["Fondos disponibles", metricas.fondos],
    ["Socios activos", metricas.socios],
    ["Créditos vigentes", metricas.creditos],
    ["Rendimientos", metricas.rendimientos],
    [],
    ["Mes", "Ingresos", "Egresos"],
    ...barras.map((d) => [d.name, d.ingresos, d.egresos]),
    [],
    ["Tipo de Crédito", "Porcentaje"],
    ...torta.map((d) => [d.name, d.valor]),
  ];

  const csvContent = rows.map((e) => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", "dashboard-estadisticas.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
