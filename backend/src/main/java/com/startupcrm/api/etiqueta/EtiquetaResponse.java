// src/main/java/com/startupcrm/api/etiqueta/EtiquetaResponse.java
package com.startupcrm.api.etiqueta;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Detalle de una etiqueta registrada en el CRM")
public record EtiquetaResponse(

        @Schema(description = "Identificador interno de la etiqueta", example = "1")
        Long id,

        @Schema(description = "Nombre de la etiqueta", example = "Lead caliente")
        String nombre,

        @Schema(description = "Color en formato HEX", example = "#e53935")
        String color,

        @Schema(description = "Contexto de aplicación", example = "cliente")
        String aplicaA
) {}
