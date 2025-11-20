package com.startupcrm.api.plantilla;

public record PlantillaUpdateRequest(
        String nombre,
        String asunto,
        String cuerpo,
        String variablesJson
) {}