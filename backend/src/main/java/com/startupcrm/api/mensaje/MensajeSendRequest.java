// src/main/java/com/startupcrm/api/mensaje/MensajeDtos.java
package com.startupcrm.api.mensaje;

import java.time.OffsetDateTime;

public record MensajeSendRequest(
        Long   conversacionId,
        String contenido          // texto del mensaje saliente
) {}