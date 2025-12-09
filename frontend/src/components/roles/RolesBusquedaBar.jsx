// src/components/roles/RolesBusquedaBar.jsx
import React from "react";

/**
 * @param {{
 *   busqueda: string;
 *   onBusquedaChange: (value: string) => void;
 *   puedeCrear: boolean;
 *   onNuevoRol: () => void;
 * }} props
 */
export default function RolesBusquedaBar({
  busqueda,
  onBusquedaChange,
  puedeCrear,
  onNuevoRol,
}) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4 gap-2 flex-wrap">
      <input
        type="text"
        placeholder="Buscar rol por nombre, descripción o permisos..."
        className="form-control flex-grow-1 shadow-sm"
        value={busqueda}
        onChange={(e) => onBusquedaChange(e.target.value)}
      />

      {puedeCrear && (
        <button className="btn btn-dark shadow-sm" onClick={onNuevoRol}>
          <i className="bi bi-shield-plus me-2"></i>
          Nuevo rol
        </button>
      )}
    </div>
  );
}
