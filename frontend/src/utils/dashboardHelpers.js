/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// utils/dashboardHelpers.js

// 1. Leads
export function contarLeads(leads) {
    return leads?.length ?? 0;
  }
  
  export function contarClientes(leads) {
    return leads?.filter(l => l.tipoContacto === "Cliente").length;
  }
  
  export function leadsNuevosEstaSemana(leads) {
    const hoy = new Date();
    const unaSemanaAtras = new Date();
    unaSemanaAtras.setDate(hoy.getDate() - 7);
  
    return leads.filter(l => {
      if (!l.creadoEn) return false;
      const fecha = new Date(l.creadoEn);
      return fecha >= unaSemanaAtras;
    }).length;
  }
  
  // 2. Tareas
  export function tareasDeHoy(tareas) {
    const hoy = new Date();
    return tareas.filter(t => {
      if (!t.vencimiento) return false;
      const fv = new Date(t.vencimiento);
      return (
        fv.getFullYear() === hoy.getFullYear() &&
        fv.getMonth() === hoy.getMonth() &&
        fv.getDate() === hoy.getDate()
      );
    }).length;
  }
  
  export function tareasVencidas(tareas) {
    return tareas.filter(t => {
      if (!t.vencimiento) return false;
      return new Date(t.vencimiento) < new Date() && t.estado !== "Completada";
    }).length;
  }
  