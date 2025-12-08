// src/pages/ConfiguracionVistasEtiquetas.jsx
import React, { useState } from "react";
import { useConfig } from "../context/configcontext.jsx";

function ConfiguracionVistasEtiquetas() {
  const {
    columnasDisponibles,
    columnasGlobales,
    setColumnasGlobales,

    etiquetas,
    agregarEtiqueta,
    renombrarEtiqueta,
    eliminarEtiqueta,

    vistas,
    guardarVista,
    eliminarVista,
  } = useConfig();

  const [tabActiva, setTabActiva] = useState("vistas");

  const [vistaActual, setVistaActual] = useState({
    id: null,
    nombre: "",
    columnas: [],
  });

  const [nuevaEtiqueta, setNuevaEtiqueta] = useState("");

  // --------------------------------------
  // MANEJO DE VISTAS
  // --------------------------------------
  const handleGuardarVista = () => {
    if (!vistaActual.nombre.trim()) return alert("La vista necesita un nombre");

    guardarVista(vistaActual);

    setVistaActual({
      id: null,
      nombre: "",
      columnas: [],
    });

    alert("Vista guardada ✔");
  };

  const handleEditarVista = (vista) => {
    setVistaActual(vista);
    setTabActiva("vistas");
  };

  const handleToggleColVista = (col) => {
    const updated = vistaActual.columnas.includes(col)
      ? vistaActual.columnas.filter((c) => c !== col)
      : [...vistaActual.columnas, col];

    setVistaActual({ ...vistaActual, columnas: updated });
  };

  // --------------------------------------
  // MANEJO DE COLUMNAS GLOBALES
  // --------------------------------------
  const toggleColumnaGlobal = (col) => {
    setColumnasGlobales((prev) =>
      prev.includes(col)
        ? prev.filter((c) => c !== col)
        : [...prev, col]
    );
  };

  // --------------------------------------
  // UI
  // --------------------------------------
  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Configuración del CRM</h2>

      {/* TABS */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${tabActiva === "vistas" ? "active" : ""}`}
            onClick={() => setTabActiva("vistas")}
          >
            Vistas Guardadas
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${tabActiva === "etiquetas" ? "active" : ""}`}
            onClick={() => setTabActiva("etiquetas")}
          >
            Etiquetas
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${tabActiva === "columnas" ? "active" : ""}`}
            onClick={() => setTabActiva("columnas")}
          >
            Columnas Globales
          </button>
        </li>
      </ul>

      {/* --------------------------- */}
      {/* TAB: VISTAS */}
      {/* --------------------------- */}
      {tabActiva === "vistas" && (
        <>
          <h4 className="mb-3">Crear / Editar Vista</h4>

          <div className="mb-3">
            <label className="form-label">Nombre de la vista</label>
            <input
              type="text"
              className="form-control"
              value={vistaActual.nombre}
              onChange={(e) =>
                setVistaActual({ ...vistaActual, nombre: e.target.value })
              }
            />
          </div>

          <h5 className="mt-3">Columnas visibles</h5>
          {columnasDisponibles.map((col) => (
            <div key={col} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={vistaActual.columnas.includes(col)}
                onChange={() => handleToggleColVista(col)}
              />
              <label className="form-check-label">{col}</label>
            </div>
          ))}

          <button className="btn btn-primary mt-3" onClick={handleGuardarVista}>
            Guardar Vista
          </button>

          <hr className="my-4" />

          <h4>Vistas Guardadas</h4>

          {vistas.length === 0 && (
            <p className="text-muted">No hay vistas guardadas.</p>
          )}

          {vistas.map((v) => (
            <div key={v.id} className="d-flex justify-content-between mt-2">
              <span>{v.nombre}</span>

              <div>
                <button
                  className="btn btn-sm btn-outline-secondary me-2"
                  onClick={() => handleEditarVista(v)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => eliminarVista(v.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* --------------------------- */}
      {/* TAB: ETIQUETAS */}
      {/* --------------------------- */}
      {tabActiva === "etiquetas" && (
        <>
          <h4>Etiquetas</h4>

          <div className="input-group mt-3 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nueva etiqueta"
              value={nuevaEtiqueta}
              onChange={(e) => setNuevaEtiqueta(e.target.value)}
            />
            <button
              className="btn btn-success"
              onClick={() => {
                if (nuevaEtiqueta.trim()) {
                  agregarEtiqueta(nuevaEtiqueta);
                  setNuevaEtiqueta("");
                }
              }}
            >
              Agregar
            </button>
          </div>

          {etiquetas.map((e) => (
            <div key={e.id} className="d-flex justify-content-between mt-2">
              <span>{e.nombre}</span>

              <div>
                <button
                  className="btn btn-sm btn-outline-secondary me-2"
                  onClick={() => {
                    const nuevo = prompt("Nuevo nombre:", e.nombre);
                    if (nuevo?.trim()) renombrarEtiqueta(e.id, nuevo);
                  }}
                >
                  Renombrar
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => eliminarEtiqueta(e.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* --------------------------- */}
      {/* TAB: COLUMNAS GLOBALES */}
      {/* --------------------------- */}
      {tabActiva === "columnas" && (
        <>
          <h4>Columnas Globales</h4>

          {columnasDisponibles.map((col) => (
            <div key={col} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={columnasGlobales.includes(col)}
                onChange={() => toggleColumnaGlobal(col)}
              />
              <label className="form-check-label">{col}</label>
            </div>
          ))}

          <button
            className="btn btn-primary mt-3"
            onClick={() => alert("Columnas guardadas ✔")}
          >
            Guardar Cambios
          </button>
        </>
      )}
    </div>
  );
}

export default ConfiguracionVistasEtiquetas;
