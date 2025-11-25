package com.startupcrm.api.plantilla;

import java.time.OffsetDateTime;

public record PlantillaResponse(
        Long            id,
        String          canal,
        String          nombre,
        String          asunto,
        String          cuerpo,
        String          variablesJson,
        OffsetDateTime creadoEn
) {}