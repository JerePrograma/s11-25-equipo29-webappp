// src/components/roles/RolesTabla.jsx
import React from "react";

/**
 * @typedef {import("../../api/types.js").RolResponse} RolResponse
 */

/**
 * @param {{
 *   roles: RolResponse[];
 *   puedeEditar: boolean;
 *   onEditar: (rol: RolResponse) => void;
 *   onEliminar: (rol: RolResponse) => void;
 * }} props
 */
export default function RolesTabla({
  roles,
  puedeEditar,
  onEditar,
  onEliminar,
}) {
  const hayRoles = roles && roles.length > 0;

  const shortPermisos = (permisosJson) => {
    if (!permisosJson) return "Sin permisos definidos";
    const trimmed = permisosJson.trim();
    if (trimmed.length <= 40) return trimmed;
    return trimmed.slice(0, 40) + "…";
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-0">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Permisos (JSON)</th>
              {puedeEditar && <th className="text-end">Acciones</th>}
            </tr>
          </thead>

          <tbody>
            {!hayRoles ? (
              <tr>
                <td colSpan={puedeEditar ? 4 : 3} className="text-center py-4 text-muted">
                  <i className="bi bi-search"></i> No se encontraron roles.
                </td>
              </tr>
            ) : (
              roles.map((r) => (
                <tr key={r.id}>
                  <td>
                    <span className="fw-semibold">{r.nombre}</span>
                  </td>

                  <td>
                    {r.descripcion || (
                      <span className="text-muted">Sin descripción</span>
                    )}
                  </td>

                  <td>
                    <code className="small text-muted">
                      {shortPermisos(r.permisosJson)}
                    </code>
                  </td>

                  {puedeEditar && (
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => onEditar(r)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onEliminar(r)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
