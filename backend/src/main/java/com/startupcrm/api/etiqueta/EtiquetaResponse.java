package com.startupcrm.api.etiqueta;

public record EtiquetaResponse(
        Long   id,
        String nombre,
        String color,
        String aplicaA
) {}