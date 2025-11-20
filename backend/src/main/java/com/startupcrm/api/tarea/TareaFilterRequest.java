package com.startupcrm.api.tarea;

import java.time.LocalDate;

public record TareaFilterRequest(
        Long     asignadoAId,
        String   estado,
        String   prioridad,
        LocalDate fechaDesde,
        LocalDate fechaHasta,
        int      page,
        int      size
) {}