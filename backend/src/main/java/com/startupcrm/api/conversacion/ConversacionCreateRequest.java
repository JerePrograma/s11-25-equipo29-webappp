// src/main/java/com/startupcrm/api/conversacion/ConversacionDtos.java
package com.startupcrm.api.conversacion;

import java.time.OffsetDateTime;
import java.util.List;

public record ConversacionCreateRequest(
        Long   clienteId,
        String canal,               // 'whatsapp','email'
        Long   canalIntegracionId,
        String asunto,
        Long   asignadoAId          // usuario responsable
) {}