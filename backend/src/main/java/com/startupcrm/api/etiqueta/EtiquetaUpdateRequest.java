package com.startupcrm.api.etiqueta;

public record EtiquetaUpdateRequest(
        String nombre,
        String color
) {}