import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportChartToPDF = (datos: { nombre: string; valor: number }[]) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Estadísticas Globales", 14, 20);

  const rows = datos.map((d) => [d.nombre, new Intl.NumberFormat("es-CO").format(d.valor)]);

  autoTable(doc, {
    head: [["Indicador", "Valor"]],
    body: rows,
    startY: 30,
  });

  doc.save("estadisticas.pdf");
};

export const exportChartToCSV = (datos: { nombre: string; valor: number }[]) => {
  const rows = [["Indicador", "Valor (COP)"]];
  datos.forEach((d) => {
    rows.push([d.nombre, d.valor.toFixed(2)]);
  });

  const csvContent = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.href = url;
  link.setAttribute("download", "estadisticas.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
