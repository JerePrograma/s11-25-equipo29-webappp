// src/main/java/com/startupcrm/api/cliente/ClienteCreateRequest.java
package com.startupcrm.api.cliente;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Payload para crear un nuevo contacto (lead/cliente)")
public record ClienteCreateRequest(

        @Schema(description = "Nombre de la persona o empresa", example = "Acme S.A.")
        @NotBlank
        String nombre,

        @Schema(description = "Email principal de contacto", example = "contacto@acme.com")
        @NotBlank @Email
        String email,

        @Schema(description = "Teléfono / WhatsApp de contacto", example = "+54 9 11 5555-5555")
        @NotBlank
        String telefono,

        @Schema(description = "Tipo de contacto", example = "lead",
                allowableValues = {"lead", "cliente"})
        @NotBlank
        String tipo,

        @Schema(description = "Estado general del contacto", example = "en_seguimiento",
                allowableValues = {"activo", "en_seguimiento", "perdido"})
        @NotBlank
        String estadoGeneral,

        @Schema(description = "ID de la etapa del funnel inicial. Si es null, se usa la etapa default.", example = "1")
        Long etapaFunnelId,

        @Schema(description = "ID del usuario propietario/responsable del contacto", example = "1")
        @NotNull
        Long propietarioId,

        @Schema(description = "Origen del contacto", example = "landing")
        String origen
) {}
