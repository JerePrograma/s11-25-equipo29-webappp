// src/pages/tareas/TareasPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../context/authcontext.jsx";

// APIs reales
import { listClientes } from "../../api/clienteApi.js";
import {
  listTareasPorUsuario,
  createTarea,
  updateTarea,
  deleteTarea,
} from "../../api/tareaApi.js";

/**
 * Helpers de fechas
 */
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

/**
 * Derivar si la tarea está completada a partir del estado backend
 */
function estaCompletada(tarea) {
  return tarea.estado === "completada";
}

/**
 * Page de Tareas
 */
export default function TareasPage() {
  const { user } = useAuth();
  const isExterno = user?.role === "externo";

  const [tareas, setTareas] = useState(
    /** @type {import("../../api/types.js").TareaResponse[]} */ ([])
  );
  const [clientes, setClientes] = useState(
    /** @type {import("../../api/types.js").ClienteResponse[]} */ ([])
  );

  const [loading, setLoading] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);

  // ----------------------------
  // Carga inicial: clientes + tareas del usuario
  // ----------------------------
  useEffect(() => {
    if (!user) return;

    let cancelado = false;

    async function cargarDatos() {
      try {
        setLoading(true);
        setErrorCarga(null);

        const [clientesData, tareasData] = await Promise.all([
          listClientes(),
          listTareasPorUsuario(user.id),
        ]);

        if (!cancelado) {
          setClientes(clientesData || []);
          setTareas(tareasData || []);
        }
      } catch (err) {
        console.error("Error cargando tareas/contactos:", err);
        if (!cancelado) {
          setErrorCarga("No se pudieron cargar tareas o contactos.");
        }
      } finally {
        if (!cancelado) setLoading(false);
      }
    }

    cargarDatos();

    return () => {
      cancelado = true;
    };
  }, [user]);

  // ----------------------------
  // Form Nueva Tarea (alineado a TareaCreateRequest)
  // ----------------------------
  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: "",
    descripcion: "",
    clienteId: /** @type {number | null} */ (null),
    clienteNombre: "",
    fechaLimite: "", // 'YYYY-MM-DD'
    prioridad: "media", // 'baja' | 'media' | 'alta'
  });

  const handleChangeCampo = (e) => {
    const { name, value } = e.target;
    setNuevaTarea((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClienteChange = (e) => {
    const nombre = e.target.value;
    const cliente = clientes.find((c) => c.nombre === nombre) || null;

    setNuevaTarea((prev) => ({
      ...prev,
      clienteNombre: nombre,
      clienteId: cliente ? cliente.id : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Debes iniciar sesión.");

    if (!nuevaTarea.titulo.trim()) {
      return alert("El título es obligatorio");
    }
    if (!nuevaTarea.fechaLimite) {
      return alert("Debe seleccionar una fecha de vencimiento");
    }

    const payload = {
      titulo: nuevaTarea.titulo.trim(),
      descripcion: nuevaTarea.descripcion.trim(),
      clienteId: nuevaTarea.clienteId ?? null,
      conversacionId: null,
      asignadoAId: user.id,
      fechaLimite: nuevaTarea.fechaLimite, // 'YYYY-MM-DD'
      prioridad: nuevaTarea.prioridad,
    };

    try {
      const creada = await createTarea(payload);
      setTareas((prev) => [...prev, creada]);

      setNuevaTarea({
        titulo: "",
        descripcion: "",
        clienteId: null,
        clienteNombre: "",
        fechaLimite: "",
        prioridad: "media",
      });
    } catch (err) {
      console.error("Error creando tarea:", err);
      alert("Error creando la tarea.");
    }
  };

  // ----------------------------
  // Filtros
  // ----------------------------
  const [filtroEstado, setFiltroEstado] = useState("pendientes");
  const [filtroFecha, setFiltroFecha] = useState("todas");
  const [filtroPrioridad, setFiltroPrioridad] = useState("todas");

  const tareasFiltradas = useMemo(() => {
    return tareas.filter((t) => {
      const completada = estaCompletada(t);

      if (filtroEstado === "pendientes" && completada) return false;
      if (filtroEstado === "completadas" && !completada) return false;

      if (filtroPrioridad !== "todas" && t.prioridad !== filtroPrioridad)
        return false;

      if (filtroFecha === "hoy" && !esHoy(t.fechaLimite)) return false;
      if (filtroFecha === "vencidas" && !esVencida(t.fechaLimite)) return false;
      if (filtroFecha === "proximas") {
        const hoy = new Date();
        const fecha = t.fechaLimite ? new Date(t.fechaLimite) : null;
        if (!fecha) return false;
        const diff = fecha - hoy;
        if (!(fecha > hoy && diff <= 1000 * 60 * 60 * 24 * 3)) return false;
      }

      return true;
    });
  }, [tareas, filtroEstado, filtroFecha, filtroPrioridad]);

  // ----------------------------
  // Modal editar
  // ----------------------------
  const [editando, setEditando] =
    useState /** @type {import("../../api/types.js").TareaResponse | null} */(
      null
    );

  const abrirEditar = (t) => setEditando({ ...t });

  const guardarEdicion = async () => {
    if (!editando) return;

    const payload = {
      titulo: editando.titulo,
      descripcion: editando.descripcion,
      estado: editando.estado,
      prioridad: editando.prioridad,
      fechaLimite: editando.fechaLimite,
      asignadoAId: editando.asignadoAId,
      recordatorioEn: editando.recordatorioEn,
    };

    try {
      const actualizada = await updateTarea(editando.id, payload);
      setTareas((prev) =>
        prev.map((t) => (t.id === actualizada.id ? actualizada : t))
      );
      setEditando(null);
    } catch (err) {
      console.error("Error actualizando tarea:", err);
      alert("Error guardando cambios de la tarea.");
    }
  };

  // ----------------------------
  // Completar / eliminar tarea
  // ----------------------------
  const completarTarea = async (id) => {
    const t = tareas.find((x) => x.id === id);
    if (!t) return;

    const payload = {
      titulo: t.titulo,
      descripcion: t.descripcion,
      estado: "completada",
      prioridad: t.prioridad,
      fechaLimite: t.fechaLimite,
      asignadoAId: t.asignadoAId,
      recordatorioEn: t.recordatorioEn,
    };

    try {
      const actualizada = await updateTarea(id, payload);
      setTareas((prev) =>
        prev.map((ta) => (ta.id === actualizada.id ? actualizada : ta))
      );
    } catch (err) {
      console.error("Error completando tarea:", err);
      alert("Error al completar la tarea.");
    }
  };

  const eliminarTarea = async (id) => {
    if (!window.confirm("¿Eliminar esta tarea?")) return;
    try {
      await deleteTarea(id);
      setTareas((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error eliminando tarea:", err);
      alert("Error al eliminar la tarea.");
    }
  };

  // ----------------------------
  // Métricas
  // ----------------------------
  const total = tareas.length;
  const completadasCount = tareas.filter(estaCompletada).length;
  const pendientesCount = tareas.length - completadasCount;
  const vencidasCount = tareas.filter((t) => esVencida(t.fechaLimite)).length;
  const hoyCount = tareas.filter((t) => esHoy(t.fechaLimite)).length;

  // ----------------------------
  // Render
  // ----------------------------
  if (!user) {
    return <p className="p-4">Debes iniciar sesión para ver tus tareas.</p>;
  }

  if (loading) {
    return <p className="p-4">Cargando tareas y contactos…</p>;
  }

  return (
    <div className="container py-4">
      {isExterno && (
        <div className="alert alert-warning text-center fw-bold mb-4">
          🔒 Estás en <strong>modo visitante</strong>. Solo puedes ver tareas — no
          puedes editar ni completar.
        </div>
      )}

      {errorCarga && <div className="alert alert-danger">{errorCarga}</div>}

      {/* MÉTRICAS */}
      <div className="row mb-4 text-center">
        <div className="col">
          <h5>Total</h5>
          <div className="fw-bold">{total}</div>
        </div>
        <div className="col">
          <h5>Pendientes</h5>
          <div className="fw-bold">{pendientesCount}</div>
        </div>
        <div className="col">
          <h5>Completadas</h5>
          <div className="fw-bold">{completadasCount}</div>
        </div>
        <div className="col">
          <h5>Vencidas</h5>
          <div className="fw-bold text-danger">{vencidasCount}</div>
        </div>
        <div className="col">
          <h5>Para hoy</h5>
          <div className="fw-bold text-warning">{hoyCount}</div>
        </div>
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
                  onChange={handleChangeCampo}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Contacto (cliente)</label>
                <input
                  list="lista-contactos"
                  type="text"
                  name="clienteNombre"
                  className="form-control"
                  value={nuevaTarea.clienteNombre}
                  onChange={handleClienteChange}
                />
                <datalist id="lista-contactos">
                  {clientes.map((c) => (
                    <option key={c.id} value={c.nombre} />
                  ))}
                </datalist>
                <small className="text-muted">
                  Se asociará la tarea al cliente seleccionado.
                </small>
              </div>

              <div className="col-md-12">
                <label className="form-label">Descripción</label>
                <textarea
                  name="descripcion"
                  className="form-control"
                  value={nuevaTarea.descripcion}
                  onChange={handleChangeCampo}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Prioridad</label>
                <select
                  name="prioridad"
                  className="form-select"
                  value={nuevaTarea.prioridad}
                  onChange={handleChangeCampo}
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Vencimiento *</label>
                <input
                  type="date"
                  name="fechaLimite"
                  className="form-control"
                  value={nuevaTarea.fechaLimite}
                  onChange={handleChangeCampo}
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

      {/* FILTROS BÁSICOS */}
      <div className="row mb-3 g-2">
        <div className="col-md-4">
          <label className="form-label">Estado</label>
          <select
            className="form-select"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="pendientes">Pendientes</option>
            <option value="completadas">Completadas</option>
            <option value="todas">Todas</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Fecha</label>
          <select
            className="form-select"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
          >
            <option value="todas">Todas</option>
            <option value="hoy">Solo hoy</option>
            <option value="vencidas">Vencidas</option>
            <option value="proximas">Próximos 3 días</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Prioridad</label>
          <select
            className="form-select"
            value={filtroPrioridad}
            onChange={(e) => setFiltroPrioridad(e.target.value)}
          >
            <option value="todas">Todas</option>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>
      </div>

      {/* LISTADO TAREAS */}
      <h4 className="fw-bold mb-3">Tareas</h4>

      {tareasFiltradas.length === 0 ? (
        <p className="text-muted">No hay tareas con los filtros actuales.</p>
      ) : (
        <div className="list-group">
          {tareasFiltradas.map((t) => {
            let clase =
              "list-group-item d-flex justify-content-between align-items-start";

            if (estaCompletada(t)) clase += " bg-light text-muted";
            else if (esVencida(t.fechaLimite)) clase += " list-group-item-danger";
            else if (esHoy(t.fechaLimite)) clase += " list-group-item-warning";
            else clase += " list-group-item-success";

            return (
              <div key={t.id} className={clase}>
                <div>
                  <h6 className="fw-bold mb-1">{t.titulo}</h6>

                  {t.descripcion && (
                    <p className="small mb-1">{t.descripcion}</p>
                  )}

                  <div className="small mb-1">
                    <strong>Contacto:</strong> {t.clienteNombre || "—"} ·{" "}
                    <strong>Prioridad:</strong> {t.prioridad} ·{" "}
                    <strong>Estado:</strong> {t.estado}
                  </div>

                  <div className="small text-muted">
                    Vence:{" "}
                    {t.fechaLimite
                      ? new Date(t.fechaLimite).toLocaleDateString()
                      : "—"}
                  </div>
                </div>

                <div className="d-flex flex-column gap-1">
                  {isExterno ? (
                    <span className="badge bg-secondary">Solo lectura</span>
                  ) : (
                    <>
                      {!estaCompletada(t) ? (
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

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarTarea(t.id)}
                      >
                        Eliminar
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
                <button
                  className="btn-close"
                  onClick={() => setEditando(null)}
                ></button>
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
                      setEditando({
                        ...editando,
                        descripcion: e.target.value,
                      })
                    }
                  ></textarea>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Estado</label>
                    <select
                      className="form-select"
                      value={editando.estado}
                      onChange={(e) =>
                        setEditando({ ...editando, estado: e.target.value })
                      }
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en_progreso">En progreso</option>
                      <option value="completada">Completada</option>
                      <option value="cancelada">Cancelada</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Prioridad</label>
                    <select
                      className="form-select"
                      value={editando.prioridad}
                      onChange={(e) =>
                        setEditando({
                          ...editando,
                          prioridad: e.target.value,
                        })
                      }
                    >
                      <option value="baja">Baja</option>
                      <option value="media">Media</option>
                      <option value="alta">Alta</option>
                    </select>
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">Fecha de vencimiento</label>
                    <input
                      type="date"
                      className="form-control"
                      value={editando.fechaLimite || ""}
                      onChange={(e) =>
                        setEditando({
                          ...editando,
                          fechaLimite: e.target.value,
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
                <button className="btn btn-primary" onClick={guardarEdicion}>
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
