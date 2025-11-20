package com.startupcrm.api.vista;

import java.time.OffsetDateTime;

public record VistaGuardadaResponse(
        Long            id,
        String          entidad,
        String          nombre,
        String          filtrosJson,
        String          columnasJson,
        boolean         esPublica,
        Long            usuarioId,
        String          usuarioNombre,
        OffsetDateTime creadoEn
) {}