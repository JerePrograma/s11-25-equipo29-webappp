// src/main/java/com/startupcrm/api/actividad/ActividadDtos.java
package com.startupcrm.api.actividad;

import java.time.OffsetDateTime;

public record ActividadResponse(
        Long            id,
        Long            clienteId,
        String          clienteNombre,
        Long            usuarioId,
        String          usuarioNombre,
        Long            conversacionId,
        Long            tareaId,
        String          tipo,           // 'cliente_creado','mensaje_enviado', etc.
        OffsetDateTime  fecha,
        String          metadataJson
) {}