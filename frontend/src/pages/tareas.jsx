    // src/pages/Tareas.jsx
    import React, { useState } from "react";
    import { useTasks } from "../context/taskcontext.jsx";
    import { useAuth } from "../context/authcontext.jsx";
    import { useLeads } from "../context/leadcontext.jsx";

    // ----------------------------
    // Helpers
    // ----------------------------
    function esVencida(v) {
      if (!v) return false;
      return new Date(v) < new Date();
    }

    function esHoy(v) {
      if (!v) return false;
      const hoy = new Date();
      const d = new Date(v);

      return (
        d.getFullYear() === hoy.getFullYear() &&
        d.getMonth() === hoy.getMonth() &&
        d.getDate() === hoy.getDate()
      );
    }

    // ----------------------------
    // Componente principal
    // ----------------------------
    export default function Tareas() {
      const { tareas, crearTarea, completarTarea, actualizarTarea } = useTasks();
      const { user } = useAuth();
      const { leads } = useLeads();   // ← TAREAS VE LOS CONTACTOS

      const isExterno = user?.role === "externo";

      console.log("USUARIO →", user);
      console.log("ROL →", user?.role);
      console.log("¿EXTERNO? →", isExterno);

      // ----------------------------
      // Form Nueva Tarea
      // ----------------------------
      const [nuevaTarea, setNuevaTarea] = useState({
        titulo: "",
        descripcion: "",
        contacto: "",
        canal: "WhatsApp",
        tipo: "Llamada",
        vencimiento: "",
      });

      const handleChange = (e) => {
        setNuevaTarea({ ...nuevaTarea, [e.target.name]: e.target.value });
      };

      const handleSubmit = (e) => {
        e.preventDefault();

        if (!nuevaTarea.titulo.trim()) return alert("El título es obligatorio");
        if (!nuevaTarea.vencimiento) return alert("Debe seleccionar una fecha");

        crearTarea(nuevaTarea);

        setNuevaTarea({
          titulo: "",
          descripcion: "",
          contacto: "",
          canal: "WhatsApp",
          tipo: "Llamada",
          vencimiento: "",
        });
      };

      // ----------------------------
      // Filtros
      // ----------------------------
      const [filtroEstado, setFiltroEstado] = useState("pendientes");
      const [filtroCanal, setFiltroCanal] = useState("todos");
      const [filtroTipo, setFiltroTipo] = useState("todos");
      const [filtroFecha, setFiltroFecha] = useState("todas");

      const tareasFiltradas = tareas.filter((t) => {
        if (filtroEstado === "pendientes" && t.completada) return false;
        if (filtroEstado === "completadas" && !t.completada) return false;
        if (filtroCanal !== "todos" && t.canal !== filtroCanal) return false;
        if (filtroTipo !== "todos" && t.tipo !== filtroTipo) return false;

        if (filtroFecha === "hoy" && !esHoy(t.vencimiento)) return false;
        if (filtroFecha === "vencidas" && !esVencida(t.vencimiento)) return false;

        if (filtroFecha === "proximas") {
          const hoy = new Date();
          const fecha = new Date(t.vencimiento);
          if (!(fecha > hoy && fecha - hoy <= 1000 * 60 * 60 * 24 * 3)) return false;
        }

        return true;
      });

      // ----------------------------
      // Modal editar
      // ----------------------------
      const [editando, setEditando] = useState(null);

      const abrirEditar = (t) => setEditando({ ...t });

      const guardarEdicion = () => {
        actualizarTarea(editando.id, editando);
        setEditando(null);
      };

      // ----------------------------
      // Métricas
      // ----------------------------
      const total = tareas.length;
      const completadas = tareas.filter((t) => t.completada).length;
      const pendientes = tareas.filter((t) => !t.completada).length;
      const vencidas = tareas.filter((t) => esVencida(t.vencimiento)).length;
      const hoyCount = tareas.filter((t) => esHoy(t.vencimiento)).length;

      return (
        <div className="container py-4">

          {/* AVISO VISITANTE */}
          {isExterno && (
            <div className="alert alert-warning text-center fw-bold mb-4">
              🔒 Estás en <strong>modo visitante</strong>.  
              Solo puedes ver tareas — no puedes editar ni completar.
            </div>
          )}

          {/* MÉTRICAS */}
          <div className="row mb-4 text-center">
            <div className="col"><h5>Total</h5><div className="fw-bold">{total}</div></div>
            <div className="col"><h5>Pendientes</h5><div className="fw-bold">{pendientes}</div></div>
            <div className="col"><h5>Completadas</h5><div className="fw-bold">{completadas}</div></div>
            <div className="col"><h5>Vencidas</h5><div className="fw-bold text-danger">{vencidas}</div></div>
            <div className="col"><h5>Para hoy</h5><div className="fw-bold text-warning">{hoyCount}</div></div>
          </div>

          {/* FORM NUEVA TAREA (SOLO INTERNOS) */}
          {!isExterno && (
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Nueva tarea</h5>

                <form onSubmit={handleSubmit} className="row g-3">

                  <div className="col-md-6">
                    <label className="form-label">Título *</label>
                    <input
                      type="text"
                      name="titulo"
                      className="form-control"
                      value={nuevaTarea.titulo}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Contacto</label>

                    {/* AUTOCOMPLETE CON LEADS */}
                    <input
                      list="lista-contactos"
                      type="text"
                      name="contacto"
                      className="form-control"
                      value={nuevaTarea.contacto}
                      onChange={handleChange}
                    />

                    <datalist id="lista-contactos">
                      {leads.map((l) => (
                        <option key={l.id} value={l.nombre} />
                      ))}
                    </datalist>
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">Descripción</label>
                    <textarea
                      name="descripcion"
                      className="form-control"
                      value={nuevaTarea.descripcion}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Canal</label>
                    <select
                      name="canal"
                      className="form-select"
                      value={nuevaTarea.canal}
                      onChange={handleChange}
                    >
                      <option>WhatsApp</option>
                      <option>Email</option>
                      <option>Llamada</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Tipo</label>
                    <select
                      name="tipo"
                      className="form-select"
                      value={nuevaTarea.tipo}
                      onChange={handleChange}
                    >
                      <option>Llamada</option>
                      <option>Mensaje</option>
                      <option>Reunión</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Vencimiento *</label>
                    <input
                      type="datetime-local"
                      name="vencimiento"
                      className="form-control"
                      value={nuevaTarea.vencimiento}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <button className="btn btn-primary mt-2" type="submit">
                      Crear tarea
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* LISTADO TAREAS */}
          <h4 className="fw-bold mb-3">Tareas</h4>

          {tareasFiltradas.length === 0 ? (
            <p className="text-muted">No hay tareas.</p>
          ) : (
            <div className="list-group">
              {tareasFiltradas.map((t) => {
                let clase =
                  "list-group-item d-flex justify-content-between align-items-start";

                if (t.completada) clase += " bg-light text-muted";
                else if (esVencida(t.vencimiento)) clase += " list-group-item-danger";
                else if (esHoy(t.vencimiento)) clase += " list-group-item-warning";
                else clase += " list-group-item-success";

                return (
                  <div key={t.id} className={clase}>
                    <div>
                      <h6 className="fw-bold mb-1">{t.titulo}</h6>

                      {t.descripcion && (
                        <p className="small mb-1">{t.descripcion}</p>
                      )}

                      <div className="small mb-1">
                        <strong>Contacto:</strong> {t.contacto || "—"} ·{" "}
                        <strong>Canal:</strong> {t.canal} ·{" "}
                        <strong>Tipo:</strong> {t.tipo}
                      </div>

                      <div className="small text-muted">
                        Vence: {new Date(t.vencimiento).toLocaleString()}
                      </div>
                    </div>

                    {/* BOTONES SEGÚN ROL */}
                    <div className="d-flex flex-column gap-1">

                      {isExterno ? (
                        <span className="badge bg-secondary">Solo lectura</span>
                      ) : (
                        <>
                          {!t.completada ? (
                            <button
                              className="btn btn-sm btn-outline-dark"
                              onClick={() => completarTarea(t.id)}
                            >
                              ✓ Completar
                            </button>
                          ) : (
                            <span className="badge bg-dark">Completada</span>
                          )}

                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => abrirEditar(t)}
                          >
                            Editar
                          </button>
                        </>
                      )}

                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* MODAL EDITAR */}
          {editando && !isExterno && (
            <div
              className="modal d-block"
              tabIndex="-1"
              style={{ background: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog">
                <div className="modal-content">

                  <div className="modal-header">
                    <h5 className="modal-title">Editar tarea</h5>
                    <button className="btn-close" onClick={() => setEditando(null)}></button>
                  </div>

                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Título</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editando.titulo}
                        onChange={(e) =>
                          setEditando({ ...editando, titulo: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Descripción</label>
                      <textarea
                        className="form-control"
                        value={editando.descripcion}
                        onChange={(e) =>
                          setEditando({ ...editando, descripcion: e.target.value })
                        }
                      ></textarea>
                    </div>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Canal</label>
                        <select
                          className="form-select"
                          value={editando.canal}
                          onChange={(e) =>
                            setEditando({ ...editando, canal: e.target.value })
                          }
                        >
                          <option>WhatsApp</option>
                          <option>Email</option>
                          <option>Llamada</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Tipo</label>
                        <select
                          className="form-select"
                          value={editando.tipo}
                          onChange={(e) =>
                            setEditando({ ...editando, tipo: e.target.value })
                          }
                        >
                          <option>Llamada</option>
                          <option>Mensaje</option>
                          <option>Reunión</option>
                        </select>
                      </div>

                      <div className="col-md-12">
                        <label className="form-label">Fecha de vencimiento</label>
                        <input
                          type="datetime-local"
                          className="form-control"
                          value={editando.vencimiento?.slice(0, 16)}
                          onChange={(e) =>
                            setEditando({
                              ...editando,
                              vencimiento: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setEditando(null)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={guardarEdicion}
                    >
                      Guardar cambios
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>
      );
    }
