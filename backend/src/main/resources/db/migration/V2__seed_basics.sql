-- ------------------------------------------------------------
-- ROLES BASICOS
-- ------------------------------------------------------------
INSERT INTO rol (nombre, descripcion, permisos_json)
VALUES ('ADMIN', 'Administrador del sistema', NULL),
       ('VENTAS', 'Usuario de ventas / comerciales', NULL);


-- ------------------------------------------------------------
-- ETAPAS DE FUNNEL BASICAS
-- ------------------------------------------------------------
INSERT INTO etapa_funnel (nombre, orden, es_default)
VALUES ('Nuevo', 1, TRUE), -- etapa default
       ('En contacto', 2, FALSE),
       ('En negociación', 3, FALSE),
       ('Cliente', 4, FALSE),
       ('Perdido', 99, FALSE);


-- ------------------------------------------------------------
-- CANALES DE INTEGRACION (CONFIG BASICA VACIA)
-- ------------------------------------------------------------
INSERT INTO canal_integracion (tipo, nombre, config_json, activo, creado_en)
VALUES ('whatsapp', 'WhatsApp principal', '{}', TRUE, CURRENT_TIMESTAMP),
       ('email', 'Email principal', '{}', TRUE, CURRENT_TIMESTAMP);


-- ------------------------------------------------------------
-- ETIQUETAS UTILES INICIALES
-- ------------------------------------------------------------
INSERT INTO etiqueta (nombre, color, aplica_a)
VALUES
    -- Para clientes
    ('Lead caliente', '#e53935', 'cliente'),
    ('Lead frío', '#1e88e5', 'cliente'),
    ('Cliente clave', '#8e24aa', 'cliente'),

    -- Para conversaciones
    ('Respuesta pendiente', '#fb8c00', 'conversacion'),
    ('Escalar a soporte', '#6d4c41', 'conversacion'),

    -- Para tareas
    ('Prioridad alta', '#d81b60', 'tarea'),
    ('Prioridad baja', '#43a047', 'tarea');


-- ------------------------------------------------------------
-- PLANTILLAS DE COMUNICACION BASICAS
-- ------------------------------------------------------------
INSERT INTO plantilla_comunicacion (canal, nombre, asunto, cuerpo, variables_json, creado_en)
VALUES
    -- WhatsApp: seguimiento inicial
    ('whatsapp',
     'Seguimiento inicial',
     NULL,
     'Hola {{nombre}}, soy {{agente}} de {{startup}}. ¿Te queda cómodo seguir hablando por este medio?',
     '["nombre","agente","startup"]',
     CURRENT_TIMESTAMP),

    -- Email: bienvenida
    ('email',
     'Bienvenida lead',
     'Bienvenido/a a {{startup}}',
     'Hola {{nombre}}, gracias por tu interés en {{startup}}. ' ||
     'Te escribimos para coordinar el próximo paso y entender mejor qué necesitás.',
     '["nombre","startup"]',
     CURRENT_TIMESTAMP);
