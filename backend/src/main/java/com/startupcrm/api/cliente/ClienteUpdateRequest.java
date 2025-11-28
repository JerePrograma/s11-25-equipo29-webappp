// src/main/java/com/startupcrm/api/cliente/ClienteUpdateRequest.java
package com.startupcrm.api.cliente;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Payload para actualizar un contacto (lead/cliente)")
public record ClienteUpdateRequest(

        @Schema(description = "Nombre de la persona o empresa", example = "Acme S.A. Renovado")
        String nombre,

        @Schema(description = "Email principal de contacto", example = "nuevo-contacto@acme.com")
        String email,

        @Schema(description = "Teléfono / WhatsApp", example = "+54 9 11 4444-4444")
        String telefono,

        @Schema(description = "Tipo de contacto", example = "cliente")
        String tipo,

        @Schema(description = "Estado general", example = "activo")
        String estadoGeneral,

        @Schema(description = "ID de la etapa de funnel", example = "2")
        Long etapaFunnelId,

        @Schema(description = "ID del usuario propietario", example = "2")
        Long propietarioId,

        @Schema(description = "Origen del contacto", example = "referido")
        String origen
) {}
