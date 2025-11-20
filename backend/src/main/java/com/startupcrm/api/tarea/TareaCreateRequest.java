// src/main/java/com/startupcrm/api/tarea/TareaDtos.java
package com.startupcrm.api.tarea;

import java.time.LocalDate;
import java.time.OffsetDateTime;

public record TareaCreateRequest(
        String titulo,
        String descripcion,
        Long   clienteId,
        Long   conversacionId,
        Long   asignadoAId,
        LocalDate fechaLimite,
        String prioridad           // 'baja','media','alta'
) {}