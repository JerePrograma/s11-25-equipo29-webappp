package com.startupcrm.api.tarea;

import java.time.LocalDate;
import java.time.OffsetDateTime;

public record TareaResponse(
        Long            id,
        String          titulo,
        String          descripcion,
        Long            clienteId,
        String          clienteNombre,
        Long            conversacionId,
        Long            asignadoAId,
        String          asignadoANombre,
        String          estado,
        String          prioridad,
        LocalDate fechaLimite,
        OffsetDateTime recordatorioEn,
        OffsetDateTime  creadoEn,
        OffsetDateTime  completadaEn
) {}