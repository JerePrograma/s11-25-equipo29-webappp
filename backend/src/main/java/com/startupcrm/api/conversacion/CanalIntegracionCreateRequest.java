// src/main/java/com/startupcrm/api/conversacion/CanalIntegracionDtos.java
package com.startupcrm.api.conversacion;

import java.time.OffsetDateTime;

public record CanalIntegracionCreateRequest(
        String tipo,          // 'whatsapp','email'
        String nombre,
        String configJson,    // JSON con tokens, ids, etc.
        boolean activo
) {}