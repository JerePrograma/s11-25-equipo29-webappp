package com.startupcrm.api.conversacion;

import java.time.OffsetDateTime;

public record CanalIntegracionResponse(
        Long            id,
        String          tipo,
        String          nombre,
        String          configJson,
        boolean         activo,
        OffsetDateTime creadoEn
) {}