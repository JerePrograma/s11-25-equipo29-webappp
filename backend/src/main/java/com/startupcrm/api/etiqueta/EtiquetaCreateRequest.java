// src/main/java/com/startupcrm/api/etiqueta/EtiquetaDtos.java
package com.startupcrm.api.etiqueta;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Payload para crear una nueva etiqueta de CRM")
public record EtiquetaCreateRequest(

        @Schema(description = "Nombre legible de la etiqueta",
                example = "Lead caliente")
        @NotBlank
        String nombre,

        @Schema(description = "Color en formato HEX para la UI",
                example = "#e53935")
        @NotBlank
        String color,

        @Schema(description = "Contexto al que aplica la etiqueta",
                example = "cliente",
                allowableValues = {"cliente", "conversacion", "tarea"})
        @NotBlank
        String aplicaA
) {}
