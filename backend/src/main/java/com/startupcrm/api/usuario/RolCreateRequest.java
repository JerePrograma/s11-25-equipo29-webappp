// src/main/java/com/startupcrm/api/usuario/RolDtos.java
package com.startupcrm.api.usuario;

public record RolCreateRequest(
        String nombre,
        String descripcion,
        String permisosJson   // JSON con permisos, si lo usás
) {}
