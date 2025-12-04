/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// src/utils/seguimientoHelpers.js

function normalizarFechaHoy() {
    const hoy = new Date();
    return new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  }
  
  export function parseFecha(fechaStr) {
    if (!fechaStr) return null;
    const [year, month, day] = fechaStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  
  export function esHoy(fechaStr) {
    const fecha = parseFecha(fechaStr);
    if (!fecha) return false;
  
    const hoy = normalizarFechaHoy();
    return fecha.getTime() === hoy.getTime();
  }
  
  export function estaAtrasado(fechaStr) {
    const fecha = parseFecha(fechaStr);
    if (!fecha) return false;
  
    const hoy = normalizarFechaHoy();
    return fecha.getTime() < hoy.getTime();
  }
  
  export function esEnProximosDias(fechaStr, dias = 7) {
    const fecha = parseFecha(fechaStr);
    if (!fecha) return false;
  
    const hoy = normalizarFechaHoy();
    const limite = new Date(hoy);
    limite.setDate(limite.getDate() + dias);
  
    return fecha.getTime() > hoy.getTime() && fecha.getTime() <= limite.getTime();
  }
  