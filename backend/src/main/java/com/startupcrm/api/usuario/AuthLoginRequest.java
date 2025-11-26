// src/main/java/com/startupcrm/api/usuario/AuthDtos.java
package com.startupcrm.api.usuario;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "AuthLoginRequest", description = "Payload para iniciar sesión en el Startup CRM")
public record AuthLoginRequest(
        @Schema(description = "Email de login del usuario", example = "admin@startupcrm.com")
        String email,

        @Schema(description = "Contraseña en texto plano", example = "123456")
        String password
) {}
