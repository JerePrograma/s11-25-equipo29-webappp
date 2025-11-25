package com.startupcrm.api.tarea;

import java.time.LocalDate;
import java.time.OffsetDateTime;

public record TareaUpdateRequest(
        String   titulo,
        String   descripcion,
        String   estado,           // 'pendiente','en_progreso','completada','cancelada'
        String   prioridad,
        LocalDate fechaLimite,
        Long     asignadoAId,
        OffsetDateTime recordatorioEn
) {}