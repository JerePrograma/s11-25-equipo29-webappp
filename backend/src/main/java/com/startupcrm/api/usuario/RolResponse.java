// src/main/java/com/startupcrm/api/usuario/RolResponse.java
package com.startupcrm.api.usuario;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "RolResponse", description = "Respuesta con los datos de un rol configurado en el sistema")
public record RolResponse(
        @Schema(description = "Identificador del rol", example = "1")
        Long   id,

        @Schema(description = "Nombre del rol", example = "ADMIN")
        String nombre,

        @Schema(description = "Descripción del rol", example = "Administrador del sistema")
        String descripcion,

        @Schema(
                description = "Permisos en formato JSON",
                example = """
                        {
                          "contactos": ["read","write","delete"],
                          "conversaciones": ["read","write","delete"],
                          "tareas": ["read","write"]
                        }
                        """
        )
        String permisosJson
) {}
