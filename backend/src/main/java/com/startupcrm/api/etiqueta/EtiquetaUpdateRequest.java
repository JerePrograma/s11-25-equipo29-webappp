// src/main/java/com/startupcrm/api/etiqueta/EtiquetaUpdateRequest.java
package com.startupcrm.api.etiqueta;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Payload para actualizar una etiqueta existente")
public record EtiquetaUpdateRequest(

        @Schema(description = "Nuevo nombre de la etiqueta", example = "Cliente clave")
        String nombre,

        @Schema(description = "Nuevo color en formato HEX", example = "#8e24aa")
        String color
) {}
