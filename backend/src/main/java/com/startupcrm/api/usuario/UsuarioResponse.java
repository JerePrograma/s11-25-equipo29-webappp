package com.startupcrm.api.usuario;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;

@Schema(name = "UsuarioResponse", description = "Datos de un usuario del sistema")
public record UsuarioResponse(
        @Schema(description = "Identificador del usuario", example = "3")
        Long   id,

        @Schema(description = "Nombre completo del usuario", example = "Jeremías Rivelli")
        String nombre,

        @Schema(description = "Email de login", example = "jere@startupcrm.com")
        String email,

        @Schema(description = "Teléfono de contacto", example = "+5492225402230")
        String telefono,

        @Schema(description = "Estado del usuario", example = "activo")
        String estado,

        @Schema(description = "Id del rol asignado", example = "1")
        Long   rolId,

        @Schema(description = "Nombre del rol asignado", example = "ADMIN")
        String rolNombre,

        @Schema(description = "Fecha de creación del usuario")
        OffsetDateTime creadoEn,

        @Schema(description = "Último login exitoso del usuario")
        OffsetDateTime ultimoLoginEn
) {}
