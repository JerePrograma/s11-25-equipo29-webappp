// src/main/java/com/startupcrm/api/plantilla/PlantillaComunicacionDtos.java
package com.startupcrm.api.plantilla;

import java.time.OffsetDateTime;

public record PlantillaCreateRequest(
        String canal,          // 'whatsapp','email'
        String nombre,
        String asunto,         // solo email
        String cuerpo,
        String variablesJson   // JSON con lista de variables
) {}