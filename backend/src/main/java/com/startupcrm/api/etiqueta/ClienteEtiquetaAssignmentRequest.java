// src/main/java/com/startupcrm/api/etiqueta/ClienteEtiquetaAssignmentRequest.java
package com.startupcrm.api.etiqueta;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Request para asignar una etiqueta puntual a un cliente")
public record ClienteEtiquetaAssignmentRequest(

        @Schema(description = "ID del cliente al que se asigna la etiqueta", example = "10")
        Long clienteId,

        @Schema(description = "ID de la etiqueta a asignar", example = "3")
        Long etiquetaId
) {}
