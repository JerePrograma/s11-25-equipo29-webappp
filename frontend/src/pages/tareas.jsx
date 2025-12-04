// src/pages/Tareas.jsx
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTasks } from "../context/taskcontext.jsx";

function esVencida(vencimiento) {
  if (!vencimiento) return false;
  return new Date(vencimiento) < new Date();
}

function esHoy(vencimiento) {
  if (!vencimiento) return false;
  const hoy = new Date();
  const d = new Date(vencimiento);
  return (
    d.getFullYear() === hoy.getFullYear() &&
    d.getMonth() === hoy.getMonth() &&
    d.getDate() === hoy.getDate()
  );
}

function Tareas() {
  const { tareas, crearTarea, completarTarea } = useTasks();
  const [searchParams] = useSearchParams();

  const contactoDesdeURL = searchParams.get("contacto") || "";

  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: "",
    descripcion: "",
    contacto: contactoDesdeURL,
    canal: "WhatsApp",
    tipo: "Llamada",
    vencimiento: "",
  });

  const handleGuardarTarea = () => {
    if (!nuevaTarea.titulo.trim()) {
      alert("El título de la tarea es obligatorio");
      return;
    }
    if (!nuevaTarea.contacto.trim()) {
      alert("El contacto asociado es obligatorio");
      return;
    }
    if (!nuevaTarea.vencimiento) {
      alert("La fecha/hora de vencimiento es obligatoria");
      return;
    }

    crearTarea(nuevaTarea);

    setNuevaTarea({
      titulo: "",
      descripcion: "",
      contacto: contactoDesdeURL || "",
      canal: "WhatsApp",
      tipo: "Llamada",
      vencimiento: "",
    });
  };

  const tareasOrdenadas = [...tareas].sort(
    (a, b) =>
      new Date(a.vencimiento || 0) - new Date(b.vencimiento || 0)
  );

  return (
    <div className="container-fluid py-4">
      <header className="mb-4">
        <h1 className="h3 fw-bold mb-1">Tareas de seguimiento</h1>
        <p className="text-muted mb-0">
          Creá y gestioná tareas asociadas a tus contactos y conversaciones.
        </p>
      </header>

      {/* Formulario Nueva tarea */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Nueva tarea</h5>

          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                value={nuevaTarea.titulo}
                onChange={(e) =>
                  setNuevaTarea({
                    ...nuevaTarea,
                    titulo: e.target.value,
                  })
                }
                placeholder="Ej: Llamar para cerrar venta"
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Contacto asociado</label>
              <input
                type="text"
                className="form-control"
                value={nuevaTarea.contacto}
                onChange={(e) =>
                  setNuevaTarea({
                    ...nuevaTarea,
                    contacto: e.target.value,
                  })
                }
                placeholder="Ej: María Gómez"
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Fecha y hora vencimiento</label>
              <input
                type="datetime-local"
                className="form-control"
                value={nuevaTarea.vencimiento}
                onChange={(e) =>
                  setNuevaTarea({
                    ...nuevaTarea,
                    vencimiento: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Tipo de tarea</label>
              <select
                className="form-select"
                value={nuevaTarea.tipo}
                onChange={(e) =>
                  setNuevaTarea({
                    ...nuevaTarea,
                    tipo: e.target.value,
                  })
                }
              >
                <option>Llamada</option>
                <option>Mensaje</option>
                <option>Reunión</option>
                <option>Otro</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Canal</label>
              <select
                className="form-select"
                value={nuevaTarea.canal}
                onChange={(e) =>
                  setNuevaTarea({
                    ...nuevaTarea,
                    canal: e.target.value,
                  })
                }
              >
                <option>WhatsApp</option>
                <option>Email</option>
                <option>Llamada</option>
                <option>Instagram</option>
              </select>
            </div>

            <div className="col-12">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                rows="2"
                value={nuevaTarea.descripcion}
                onChange={(e) =>
                  setNuevaTarea({
                    ...nuevaTarea,
                    descripcion: e.target.value,
                  })
                }
                placeholder="Detalle de la llamada, puntos a tratar, etc."
              />
            </div>

            <div className="col-12 text-end">
              <button
                className="btn btn-dark"
                onClick={handleGuardarTarea}
              >
                Guardar tarea de seguimiento
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de tareas */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="card-title mb-3">Tareas pendientes</h5>

          {tareasOrdenadas.length === 0 ? (
            <p className="text-muted small">
              No tenés tareas cargadas todavía.
            </p>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Título</th>
                    <th>Contacto</th>
                    <th>Tipo</th>
                    <th>Canal</th>
                    <th>Vencimiento</th>
                    <th>Estado</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {tareasOrdenadas.map((t) => {
                    const vencida = esVencida(t.vencimiento);
                    const hoy = esHoy(t.vencimiento);

                    let badgeClass = "bg-secondary";
                    let badgeText = t.estado;

                    if (t.estado === "Completada") {
                      badgeClass = "bg-success";
                    } else if (vencida) {
                      badgeClass = "bg-danger";
                      badgeText = "Vencida";
                    } else if (hoy) {
                      badgeClass = "bg-warning text-dark";
                      badgeText = "Para hoy";
                    } else {
                      badgeClass = "bg-info text-dark";
                      badgeText = "Pendiente";
                    }

                    return (
                      <tr key={t.id}>
                        <td>{t.titulo}</td>
                        <td>{t.contacto}</td>
                        <td>{t.tipo}</td>
                        <td>{t.canal}</td>
                        <td>
                          {t.vencimiento
                            ? new Date(t.vencimiento).toLocaleString(
                                "es-AR"
                              )
                            : "-"}
                        </td>
                        <td>
                          <span className={`badge ${badgeClass}`}>
                            {badgeText}
                          </span>
                        </td>
                        <td className="text-end">
                          {t.estado !== "Completada" && (
                            <button
                              className="btn btn-sm btn-outline-success"
                              onClick={() => completarTarea(t.id)}
                            >
                              Marcar como hecha
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tareas;
