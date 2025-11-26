// src/main/java/com/startupcrm/api/usuario/RolDtos.java
package com.startupcrm.api.usuario;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "RolCreateRequest", description = "Payload para crear un nuevo rol del sistema")
public record RolCreateRequest(
        @Schema(description = "Nombre del rol", example = "ADMIN")
        String nombre,

        @Schema(description = "Descripción legible del rol", example = "Administrador del sistema con acceso completo")
        String descripcion,

        @Schema(
                description = "JSON con permisos granulados por módulo/acción",
                example = """
                        {
                          "contactos": ["read","write"],
                          "conversaciones": ["read","write","delete"],
                          "tareas": ["read","write"]
                        }
                        """
        )
        String permisosJson
) {}
