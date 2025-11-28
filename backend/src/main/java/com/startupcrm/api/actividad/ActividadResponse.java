// src/main/java/com/startupcrm/api/actividad/ActividadResponse.java
package com.startupcrm.api.actividad;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;

@Schema(description = "Actividad registrada en el CRM")
public record ActividadResponse(

        @Schema(description = "ID de la actividad", example = "100")
        Long id,

        @Schema(description = "ID del cliente asociado", example = "10")
        Long clienteId,

        @Schema(description = "ID del usuario actor (si aplica)", example = "1")
        Long usuarioId,

        @Schema(description = "Tipo de actividad", example = "cliente_etapa_cambiada")
        String tipo,

        @Schema(description = "Fecha/hora del evento", example = "2025-11-20T10:15:30Z")
        OffsetDateTime fecha,

        @Schema(description = "Metadata adicional en JSON", example = "{\"origen\":\"kanban\",\"de\":\"Nuevo\",\"a\":\"En negociación\"}")
        String metadataJson
) {}
