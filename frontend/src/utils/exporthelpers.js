/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */

// ---------------------------
// IMPORTS → SIEMPRE ARRIBA
// ---------------------------

//import jsPDF from "jspdf";
//import "jspdf-autotable";//

// ---------------------------
// EXPORTAR CSV
// ---------------------------
export function exportToCSV(nombreArchivo, datos) {
  if (!datos || datos.length === 0) {
    alert("No hay tareas para exportar.");
    return;
  }

  const encabezados = Object.keys(datos[0]).join(",");
  const filas = datos
    .map((obj) => Object.values(obj).join(","))
    .join("\n");

  const csvContent = `${encabezados}\n${filas}`;

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${nombreArchivo}.csv`);
  document.body.appendChild(link);
  link.click();
}


// ---------------------------
// EXPORTAR PDF
// ---------------------------
export function exportToPDF(nombreArchivo, datos) {
  if (!datos || datos.length === 0) {
    alert("No hay tareas para exportar.");
    return;
  }

  const doc = new jsPDF();

  doc.autoTable({
    head: [Object.keys(datos[0])],
    body: datos.map((d) => Object.values(d)),
  });

  doc.save(`${nombreArchivo}.pdf`);
}
