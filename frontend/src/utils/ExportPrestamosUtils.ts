// ExportPrestamosUtils.ts
// Funciones para exportar la tabla de préstamos a PDF y CSV usando jsPDF y Blob

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { PrestamoVista } from "../types/PrestamoVista";

// Formateador de moneda para Colombia
const formatoPesos = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 2,
});

/**
 * Exporta los datos de préstamos a PDF con una tabla estilizada
 * @param prestamos Lista de préstamos visibles en la tabla
 */
export const exportPrestamosToPDF = (prestamos: PrestamoVista[]) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Listado de Préstamos", 14, 20);

  const body = prestamos.map((p) => [
    p.id,
    p.nombreSocio,
    p.tipoPrestamo,
    formatoPesos.format(p.monto),
    p.cuotasTotal,
    p.estado,
    p.fechaInicio,
  ]);

  autoTable(doc, {
    startY: 30,
    head: [["ID", "Socio", "Tipo", "Monto", "Cuotas", "Estado", "Inicio"]],
    body,
  });

  doc.save("prestamos.pdf");
};

/**
 * Exporta los datos de préstamos a archivo CSV
 * @param prestamos Lista de préstamos visibles en la tabla
 */
export const exportPrestamosToCSV = (prestamos: PrestamoVista[]) => {
  const rows = [
    ["ID", "Socio", "Tipo", "Monto", "Cuotas", "Estado", "Inicio"],
    ...prestamos.map((p) => [
      p.id,
      p.nombreSocio,
      p.tipoPrestamo,
      p.monto,
      p.cuotasTotal,
      p.estado,
      p.fechaInicio,
    ]),
  ];

  const csv = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "prestamos.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
