package com.startupcrm.api.usuario;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "UsuarioUpdateRequest", description = "Payload para actualizar datos de un usuario existente")
public record UsuarioUpdateRequest(
        @Schema(description = "Nuevo nombre del usuario", example = "Jeremías J. Rivelli")
        String nombre,

        @Schema(description = "Nuevo teléfono de contacto", example = "+5492225402230")
        String telefono,

        @Schema(description = "Nuevo rol asignado (id)", example = "2")
        Long   rolId,

        @Schema(description = "Estado lógico del usuario", example = "activo")
        String estado   // 'activo','inactivo'
) {}