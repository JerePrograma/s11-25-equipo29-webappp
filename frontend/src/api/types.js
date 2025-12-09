// src/api/types.js
// Tipos JSDoc para el contrato del Startup CRM.
// No se ejecuta nada en runtime, solo sirve para autocompletado / documentación.

/* ============================================================================
 * AUTENTICACIÓN
 * ==========================================================================*/

/**
 * @typedef {Object} AuthLoginRequest
 * @property {string} email - Email de login.
 * @property {string} password - Contraseña en texto plano.
 */

/**
 * @typedef {Object} AuthResponse
 * @property {string} accessToken - JWT de acceso (Authorization: Bearer ...).
 * @property {string} refreshToken - JWT de refresco.
 * @property {number} expiresIn - Tiempo de expiración del accessToken en segundos.
 */


/* ============================================================================
 * USUARIOS Y ROLES
 * ==========================================================================*/

/**
 * @typedef {Object} UsuarioCreateRequest
 * @property {string} nombre - Nombre visible del usuario.
 * @property {string} email - Email de login (único).
 * @property {string} password - Contraseña en texto plano.
 * @property {string} telefono - Teléfono de contacto.
 * @property {number} rolId - ID del rol asignado.
 */

/**
 * @typedef {Object} UsuarioResponse
 * @property {number} id - Identificador del usuario.
 * @property {string} nombre - Nombre completo.
 * @property {string} email - Email de login.
 * @property {string} telefono - Teléfono de contacto.
 * @property {string} estado - Estado lógico ('activo','inactivo').
 * @property {number} rolId - ID del rol asignado.
 * @property {string} rolNombre - Nombre del rol, por ejemplo 'ADMIN'.
 * @property {string} creadoEn - Fecha de creación (ISO-8601).
 * @property {string | null} ultimoLoginEn - Último login exitoso (ISO-8601) o null.
 */

/**
 * @typedef {Object} UsuarioUpdateRequest
 * @property {string} [nombre] - Nuevo nombre.
 * @property {string} [telefono] - Nuevo teléfono.
 * @property {number} [rolId] - Nuevo rol asignado.
 * @property {string} [estado] - Estado ('activo','inactivo').
 */

/**
 * @typedef {Object} RolCreateRequest
 * @property {string} nombre - Nombre del rol, por ejemplo 'ADMIN'.
 * @property {string} descripcion - Descripción legible del rol.
 * @property {string} permisosJson - JSON con permisos granulados por módulo/acción.
 */

/**
 * @typedef {Object} RolResponse
 * @property {number} id - Identificador del rol.
 * @property {string} nombre - Nombre del rol.
 * @property {string} descripcion - Descripción del rol.
 * @property {string} permisosJson - JSON con permisos.
 */

/**
 * @typedef {Object} RolUpdateRequest
 * @property {string} [descripcion] - Nueva descripción.
 * @property {string} [permisosJson] - Nuevo JSON de permisos.
 */


/* ============================================================================
 * CLIENTES / CONTACTOS
 * ==========================================================================*/

/**
 * @typedef {Object} ClienteCreateRequest
 * @property {string} nombre - Nombre de la persona o empresa.
 * @property {string} email - Email principal de contacto.
 * @property {string} telefono - Teléfono / WhatsApp.
 * @property {string} tipo - 'lead' o 'cliente'.
 * @property {string} estadoGeneral - 'activo','en_seguimiento','perdido'.
 * @property {number | null | undefined} [etapaFunnelId] - ID de la etapa inicial o null.
 * @property {number} propietarioId - ID del usuario propietario.
 * @property {string | null | undefined} [origen] - Origen del contacto (ej: 'landing').
 */

/**
 * @typedef {Object} ClienteResponse
 * @property {number} id - ID interno del cliente.
 * @property {string} nombre - Nombre de persona o empresa.
 * @property {string} email - Email del contacto.
 * @property {string} telefono - Teléfono del contacto.
 * @property {string} tipo - Tipo de contacto, ej: 'lead'.
 * @property {string} estadoGeneral - Estado general, ej: 'en_seguimiento'.
 * @property {number | null} etapaFunnelId - ID de la etapa actual del funnel.
 * @property {string | null} etapaFunnelNombre - Nombre de la etapa actual del funnel.
 * @property {number} propietarioId - ID del usuario propietario.
 * @property {string} propietarioNombre - Nombre del usuario propietario.
 * @property {string | null} origen - Origen del contacto.
 * @property {string | null} ultimoContactoEn - Fecha/hora del último contacto (ISO-8601) o null.
 * @property {string} creadoEn - Fecha/hora de creación (ISO-8601).
 * @property {string[]} etiquetas - Nombres de etiquetas asociadas al contacto.
 */

/**
 * @typedef {Object} ClienteUpdateRequest
 * @property {string} [nombre] - Nuevo nombre.
 * @property {string} [email] - Nuevo email.
 * @property {string} [telefono] - Nuevo teléfono.
 * @property {string} [tipo] - Nuevo tipo ('lead'|'cliente').
 * @property {string} [estadoGeneral] - Nuevo estado ('activo','en_seguimiento','perdido').
 * @property {number | null} [etapaFunnelId] - ID de la etapa de funnel.
 * @property {number} [propietarioId] - ID del nuevo propietario.
 * @property {string | null} [origen] - Nuevo origen.
 */

/**
 * @typedef {Object} ClienteCambioEtapaRequest
 * @property {number} etapaFunnelId - ID de la nueva etapa del funnel.
 * @property {number} usuarioActorId - ID del usuario que realiza el cambio.
 */


/* ============================================================================
 * ETAPAS DE FUNNEL
 * ==========================================================================*/

/**
 * @typedef {Object} EtapaFunnelCreateRequest
 * @property {string} nombre - Nombre de la etapa.
 * @property {number} orden - Orden dentro del funnel.
 * @property {boolean} esDefault - Si es la etapa default.
 */

/**
 * @typedef {Object} EtapaFunnelResponse
 * @property {number} id - ID de la etapa.
 * @property {string} nombre - Nombre de la etapa.
 * @property {number} orden - Orden.
 * @property {boolean} esDefault - Es etapa default.
 */

/**
 * @typedef {Object} EtapaFunnelUpdateRequest
 * @property {string} nombre - Nuevo nombre.
 * @property {number} orden - Nuevo orden.
 * @property {boolean} esDefault - Nuevo flag de default.
 */


/* ============================================================================
 * ACTIVIDADES
 * ==========================================================================*/

/**
 * @typedef {Object} ActividadResponse
 * @property {number} id - ID de la actividad.
 * @property {number} clienteId - ID del cliente asociado.
 * @property {number | null} usuarioId - ID del usuario actor (si aplica).
 * @property {string} tipo - Tipo de actividad, ej: 'cliente_etapa_cambiada'.
 * @property {string} fecha - Fecha/hora del evento (ISO-8601).
 * @property {string} metadataJson - JSON con metadata adicional.
 */


/* ============================================================================
 * ETIQUETAS
 * ==========================================================================*/

/**
 * @typedef {Object} EtiquetaCreateRequest
 * @property {string} nombre - Nombre legible de la etiqueta.
 * @property {string} color - Color HEX, ej: "#e53935".
 * @property {string} aplicaA - 'cliente','conversacion','tarea'.
 */

/**
 * @typedef {Object} EtiquetaResponse
 * @property {number} id - ID de la etiqueta.
 * @property {string} nombre - Nombre de la etiqueta.
 * @property {string} color - Color HEX.
 * @property {string} aplicaA - Contexto de aplicación.
 */

/**
 * @typedef {Object} EtiquetaUpdateRequest
 * @property {string} [nombre] - Nuevo nombre.
 * @property {string} [color] - Nuevo color HEX.
 */

/**
 * @typedef {Object} ClienteEtiquetaAssignmentRequest
 * @property {number} clienteId - ID del cliente al que se asigna la etiqueta.
 * @property {number} etiquetaId - ID de la etiqueta.
 */

/**
 * @typedef {Object} ClienteEtiquetasUpdateRequest
 * @property {number[]} etiquetaIds - IDs de etiquetas que deben quedar asociadas.
 * @property {number} usuarioActorId - ID del usuario que realiza la acción.
 */

/**
 * @typedef {Object} ConversacionEtiquetaAssignmentRequest
 * @property {number} conversacionId - ID de la conversación.
 * @property {number} etiquetaId - ID de la etiqueta.
 */


/* ============================================================================
 * CONVERSACIONES, MENSAJES Y CANALES
 * ==========================================================================*/

/**
 * @typedef {Object} CanalIntegracionCreateRequest
 * @property {string} tipo - 'whatsapp','email'.
 * @property {string} nombre - Nombre del canal.
 * @property {string} configJson - JSON con tokens, ids, etc.
 * @property {boolean} activo - Si el canal está activo.
 */

/**
 * @typedef {Object} CanalIntegracionResponse
 * @property {number} id - ID del canal.
 * @property {string} tipo - 'whatsapp','email'.
 * @property {string} nombre - Nombre del canal.
 * @property {string} configJson - Configuración JSON.
 * @property {boolean} activo - Activo o no.
 * @property {string} creadoEn - Fecha de creación (ISO-8601).
 */

/**
 * @typedef {Object} CanalIntegracionUpdateRequest
 * @property {string} nombre - Nuevo nombre.
 * @property {string} configJson - Nueva configuración JSON.
 * @property {boolean} activo - Nuevo estado.
 */

/**
 * @typedef {Object} ConversacionCreateRequest
 * @property {number} clienteId - ID del cliente.
 * @property {string} canal - 'whatsapp','email'.
 * @property {number} canalIntegracionId - ID del canal de integración.
 * @property {string} asunto - Asunto de la conversación.
 * @property {number} asignadoAId - Usuario responsable.
 */

/**
 * @typedef {Object} ConversacionResponse
 * @property {number} id - ID de la conversación.
 * @property {number} clienteId - ID del cliente.
 * @property {string} clienteNombre - Nombre del cliente.
 * @property {string} canal - 'whatsapp','email'.
 * @property {number} canalIntegracionId - ID del canal de integración.
 * @property {string} canalIntegracionNombre - Nombre del canal de integración.
 * @property {string} asunto - Asunto.
 * @property {string} estado - 'abierta','cerrada','pendiente', etc.
 * @property {number} asignadoAId - ID del usuario asignado.
 * @property {string} asignadoANombre - Nombre del usuario asignado.
 * @property {string | null} canalConversationId - ID de la conversación en el canal externo.
 * @property {string | null} ultimoMensajeEn - Fecha del último mensaje (ISO-8601) o null.
 * @property {string} creadoEn - Fecha de creación (ISO-8601).
 * @property {string[]} etiquetas - Etiquetas aplicadas a la conversación.
 */

/**
 * @typedef {Object} ConversacionUpdateRequest
 * @property {string} estado - Nuevo estado ('abierta','cerrada','pendiente', etc.).
 * @property {number | null} [asignadoAId] - Nuevo usuario asignado.
 */

/**
 * @typedef {Object} MensajeSendRequest
 * @property {number} conversacionId - ID de la conversación.
 * @property {string} contenido - Texto del mensaje saliente.
 */

/**
 * @typedef {Object} MensajeResponse
 * @property {number} id - ID del mensaje.
 * @property {number} conversacionId - ID de la conversación.
 * @property {string} canal - Canal ('whatsapp','email', etc.).
 * @property {string} direccion - 'in' o 'out'.
 * @property {string} contenido - Contenido del mensaje.
 * @property {string} fechaEnvio - Fecha de envío (ISO-8601).
 * @property {string} estado - Estado del mensaje.
 * @property {number | null} remitenteUsuarioId - ID del usuario remitente, si aplica.
 * @property {number | null} remitenteClienteId - ID del cliente remitente, si aplica.
 * @property {string | null} canalMessageId - ID del mensaje en el canal externo.
 */


/* ============================================================================
 * TAREAS
 * ==========================================================================*/

/**
 * @typedef {Object} TareaCreateRequest
 * @property {string} titulo - Título de la tarea.
 * @property {string} descripcion - Descripción.
 * @property {number | null} [clienteId] - Cliente asociado, si aplica.
 * @property {number | null} [conversacionId] - Conversación asociada, si aplica.
 * @property {number} asignadoAId - Usuario asignado.
 * @property {string | null} [fechaLimite] - Fecha límite (LocalDate 'YYYY-MM-DD') o null.
 * @property {string} prioridad - 'baja','media','alta'.
 */

/**
 * @typedef {Object} TareaResponse
 * @property {number} id - ID de la tarea.
 * @property {string} titulo - Título.
 * @property {string} descripcion - Descripción.
 * @property {number | null} clienteId - ID del cliente.
 * @property {string | null} clienteNombre - Nombre del cliente.
 * @property {number | null} conversacionId - ID de la conversación.
 * @property {number} asignadoAId - ID del usuario asignado.
 * @property {string} asignadoANombre - Nombre del usuario asignado.
 * @property {string} estado - Estado ('pendiente','en_progreso','completada','cancelada').
 * @property {string} prioridad - Prioridad ('baja','media','alta').
 * @property {string | null} fechaLimite - Fecha límite (LocalDate 'YYYY-MM-DD') o null.
 * @property {string | null} recordatorioEn - Fecha/hora del recordatorio (ISO-8601) o null.
 * @property {string} creadoEn - Fecha de creación (ISO-8601).
 * @property {string | null} completadaEn - Fecha de completado (ISO-8601) o null.
 */

/**
 * @typedef {Object} TareaUpdateRequest
 * @property {string} [titulo] - Nuevo título.
 * @property {string} [descripcion] - Nueva descripción.
 * @property {string} [estado] - Nuevo estado.
 * @property {string} [prioridad] - Nueva prioridad.
 * @property {string | null} [fechaLimite] - Nueva fecha límite (LocalDate 'YYYY-MM-DD') o null.
 * @property {number | null} [asignadoAId] - Nuevo usuario asignado.
 * @property {string | null} [recordatorioEn] - Nueva fecha de recordatorio (ISO-8601) o null.
 */


/* ============================================================================
 * PLANTILLAS DE COMUNICACIÓN
 * ==========================================================================*/

/**
 * @typedef {Object} PlantillaCreateRequest
 * @property {string} canal - 'whatsapp','email'.
 * @property {string} nombre - Nombre de la plantilla.
 * @property {string | null} asunto - Asunto (solo email).
 * @property {string} cuerpo - Cuerpo del mensaje.
 * @property {string} variablesJson - JSON con lista de variables.
 */

/**
 * @typedef {Object} PlantillaResponse
 * @property {number} id - ID de la plantilla.
 * @property {string} canal - Canal ('whatsapp','email').
 * @property {string} nombre - Nombre.
 * @property {string | null} asunto - Asunto.
 * @property {string} cuerpo - Cuerpo.
 * @property {string} variablesJson - JSON con variables.
 * @property {string} creadoEn - Fecha de creación (ISO-8601).
 */

/**
 * @typedef {Object} PlantillaUpdateRequest
 * @property {string} [nombre] - Nuevo nombre.
 * @property {string | null} [asunto] - Nuevo asunto.
 * @property {string} [cuerpo] - Nuevo cuerpo.
 * @property {string} [variablesJson] - Nuevas variables en JSON.
 */


/* ============================================================================
 * VISTAS GUARDADAS
 * ==========================================================================*/

/**
 * @typedef {Object} VistaGuardadaCreateRequest
 * @property {string} entidad - 'cliente','conversacion','tarea'.
 * @property {string} nombre - Nombre de la vista.
 * @property {string} filtrosJson - Filtros en JSON.
 * @property {string} columnasJson - Columnas en JSON.
 * @property {boolean} esPublica - Si es visible para todos.
 */

/**
 * @typedef {Object} VistaGuardadaResponse
 * @property {number} id - ID de la vista.
 * @property {string} entidad - Entidad ('cliente','conversacion','tarea').
 * @property {string} nombre - Nombre de la vista.
 * @property {string} filtrosJson - Filtros en JSON.
 * @property {string} columnasJson - Columnas en JSON.
 * @property {boolean} esPublica - Pública o privada.
 * @property {number} usuarioId - ID del usuario propietario.
 * @property {string} usuarioNombre - Nombre del usuario.
 * @property {string} creadoEn - Fecha de creación (ISO-8601).
 */

/**
 * @typedef {Object} VistaGuardadaUpdateRequest
 * @property {string} [nombre] - Nuevo nombre.
 * @property {string} [filtrosJson] - Nuevos filtros JSON.
 * @property {string} [columnasJson] - Nuevas columnas JSON.
 * @property {boolean} [esPublica] - Nuevo flag de visibilidad.
 */


// Marcar este archivo como módulo ES para poder usar import("../api/types.js") en JSDoc.
/* eslint-disable no-unused-vars */
export {};
/* eslint-enable no-unused-vars */
