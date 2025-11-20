package com.startupcrm.api.actividad;

import java.time.OffsetDateTime;

public record ActividadFilterRequest(
        Long            clienteId,
        String          tipo,
        OffsetDateTime fechaDesde,
        OffsetDateTime  fechaHasta,
        int             page,
        int             size
) {}