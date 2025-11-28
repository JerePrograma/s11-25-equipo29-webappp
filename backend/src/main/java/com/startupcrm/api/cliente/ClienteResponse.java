// src/main/java/com/startupcrm/api/cliente/ClienteResponse.java
package com.startupcrm.api.cliente;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;
import java.util.List;

@Schema(description = "Detalle de un contacto registrado en el CRM")
public record ClienteResponse(

        @Schema(description = "ID interno del cliente", example = "10")
        Long id,

        @Schema(description = "Nombre de persona o empresa", example = "Acme S.A.")
        String nombre,

        @Schema(description = "Email del contacto", example = "contacto@acme.com")
        String email,

        @Schema(description = "Teléfono del contacto", example = "+54 9 11 5555-5555")
        String telefono,

        @Schema(description = "Tipo de contacto", example = "lead")
        String tipo,

        @Schema(description = "Estado general", example = "en_seguimiento")
        String estadoGeneral,

        @Schema(description = "ID de la etapa actual del funnel", example = "2")
        Long etapaFunnelId,

        @Schema(description = "Nombre de la etapa actual del funnel", example = "En negociación")
        String etapaFunnelNombre,

        @Schema(description = "ID del usuario propietario", example = "1")
        Long propietarioId,

        @Schema(description = "Nombre del usuario propietario", example = "Juan Pérez")
        String propietarioNombre,

        @Schema(description = "Origen del contacto", example = "landing")
        String origen,

        @Schema(description = "Fecha/hora del último contacto registrado", example = "2025-11-20T10:15:30Z")
        OffsetDateTime ultimoContactoEn,

        @Schema(description = "Fecha/hora de creación del registro en el CRM", example = "2025-11-15T09:00:00Z")
        OffsetDateTime creadoEn,

        @ArraySchema(schema = @Schema(
                description = "Nombres de etiquetas asociadas al contacto",
                example = "[\"Lead caliente\", \"Demo agendada\"]"))
        List<String> etiquetas
) {}
