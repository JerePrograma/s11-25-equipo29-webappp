// src/main/java/com/startupcrm/api/usuario/UsuarioDtos.java
package com.startupcrm.api.usuario;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;

@Schema(name = "UsuarioCreateRequest", description = "Payload para registrar un nuevo usuario en el CRM")
public record UsuarioCreateRequest(
        @Schema(description = "Nombre visible del usuario", example = "Jeremías Rivelli")
        String nombre,

        @Schema(description = "Email de login (único)", example = "jere@startupcrm.com")
        String email,

        @Schema(description = "Contraseña en texto plano. Será hasheada en backend.", example = "123456")
        String password,

        @Schema(description = "Teléfono de contacto", example = "+5492225402230")
        String telefono,

        @Schema(description = "Identificador del rol asignado al usuario", example = "1")
        Long   rolId
) {}