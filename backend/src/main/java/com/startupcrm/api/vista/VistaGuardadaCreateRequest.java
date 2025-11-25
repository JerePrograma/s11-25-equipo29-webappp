// src/main/java/com/startupcrm/api/vista/VistaGuardadaDtos.java
package com.startupcrm.api.vista;

import java.time.OffsetDateTime;

public record VistaGuardadaCreateRequest(
        String entidad,        // 'cliente','conversacion','tarea'
        String nombre,
        String filtrosJson,    // JSON con filtros
        String columnasJson,   // JSON con columnas
        boolean esPublica
) {}