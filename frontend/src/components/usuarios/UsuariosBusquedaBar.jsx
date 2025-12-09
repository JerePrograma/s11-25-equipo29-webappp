// src/components/usuarios/UsuariosBusquedaBar.jsx
import React from "react";

/**
 * @param {{
 *   busqueda: string;
 *   onBusquedaChange: (value: string) => void;
 *   puedeCrear: boolean;
 *   onNuevoUsuario: () => void;
 * }} props
 */
export default function UsuariosBusquedaBar({
  busqueda,
  onBusquedaChange,
  puedeCrear,
  onNuevoUsuario,
}) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4 gap-2 flex-wrap">
      <input
        type="text"
        placeholder="Buscar por nombre, email, teléfono o rol..."
        className="form-control flex-grow-1 shadow-sm"
        value={busqueda}
        onChange={(e) => onBusquedaChange(e.target.value)}
      />

      {puedeCrear && (
        <button className="btn btn-dark shadow-sm" onClick={onNuevoUsuario}>
          <i className="bi bi-person-plus me-2"></i>
          Nuevo usuario
        </button>
      )}
    </div>
  );
}
