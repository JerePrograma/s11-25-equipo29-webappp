// src/main/java/com/startupcrm/api/usuario/AuthDtos.java
package com.startupcrm.api.usuario;

public record AuthLoginRequest(
        String email,
        String password
) {}
