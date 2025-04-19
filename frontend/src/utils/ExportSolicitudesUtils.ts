// ExportSolicitudesUtils.ts
// Funciones para exportar solicitudes a PDF y CSV con formato legible y plano.

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Solicitud } from "../types/Solicitud"; // Asegúrate de tener esta interfaz creada

// Exportar a PDF
export const exportSolicitudesToPDF = (solicitudes: Solicitud[]) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Listado de Solicitudes", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["Nombre", "Correo", "Teléfono", "Mensaje", "Fecha"]],
    body: solicitudes.map((s) => [
      s.nombre,
      s.correo,
      s.telefono,
      s.mensaje,
      s.fecha,
    ]),
    styles: { fontSize: 9 },
  });

  doc.save("solicitudes.pdf");
};

// Exportar a CSV
export const exportSolicitudesToCSV = (solicitudes: Solicitud[]) => {
  const rows = [
    ["Nombre", "Correo", "Teléfono", "Mensaje", "Fecha"],
    ...solicitudes.map((s) => [
      s.nombre,
      s.correo,
      s.telefono,
      s.mensaje,
      s.fecha,
    ]),
  ];

  const csvContent = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "solicitudes.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
