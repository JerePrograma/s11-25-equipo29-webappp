// src/components/contactos/ContactosBusquedaBar.jsx
import React from "react";

/**
 * @param {{
 *   busqueda: string,
 *   onBusquedaChange: (value: string) => void,
 *   onNuevoContacto: () => void,
 * }} props
 */
export default function ContactosBusquedaBar({
  busqueda,
  onBusquedaChange,
  onNuevoContacto,
}) {
  return (
    <section className="d-flex justify-content-between mb-4 gap-2 flex-wrap">
      <input
        className="form-control flex-grow-1"
        type="text"
        placeholder="Buscar por nombre, email, teléfono u origen..."
        value={busqueda}
        onChange={(e) => onBusquedaChange(e.target.value)}
      />

      <button className="btn btn-dark" onClick={onNuevoContacto}>
        + Nuevo contacto
      </button>
    </section>
  );
}
