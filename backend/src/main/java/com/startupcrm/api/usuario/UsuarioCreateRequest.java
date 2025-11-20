// src/main/java/com/startupcrm/api/usuario/UsuarioDtos.java
package com.startupcrm.api.usuario;

import java.time.OffsetDateTime;

public record UsuarioCreateRequest(
        String nombre,
        String email,
        String password,   // en texto plano, se encripta en el servicio
        String telefono,
        Long   rolId
) {}