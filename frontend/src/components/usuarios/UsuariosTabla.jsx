// src/components/usuarios/UsuariosTabla.jsx
import React from "react";

/**
 * @typedef {import("../../api/types.js").UsuarioResponse} UsuarioResponse
 */

/**
 * @param {{
 *   usuarios: UsuarioResponse[];
 *   esAdmin: boolean;
 *   onEditar: (u: UsuarioResponse) => void;
 *   onEliminar: (u: UsuarioResponse) => void;
 * }} props
 */
export default function UsuariosTabla({
  usuarios,
  esAdmin,
  onEditar,
  onEliminar,
}) {
  const hayUsuarios = usuarios && usuarios.length > 0;

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-0">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Estado</th>
              {esAdmin && <th className="text-end">Acciones</th>}
            </tr>
          </thead>

          <tbody>
            {!hayUsuarios ? (
              <tr>
                <td colSpan={esAdmin ? 6 : 5} className="text-center py-4 text-muted">
                  <i className="bi bi-search"></i> No se encontraron usuarios.
                </td>
              </tr>
            ) : (
              usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td>{u.telefono || "—"}</td>
                  <td>
                    <span className="badge bg-info text-dark fw-semibold px-3 py-2">
                      {u.rolNombre || "—"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={
                        "badge fw-semibold px-3 py-2 " +
                        (u.estado === "activo"
                          ? "bg-success"
                          : u.estado === "inactivo"
                          ? "bg-secondary"
                          : "bg-light text-dark")
                      }
                    >
                      {u.estado || "—"}
                    </span>
                  </td>

                  {esAdmin && (
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => onEditar(u)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onEliminar(u)}
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
