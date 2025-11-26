package com.startupcrm.api.usuario;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "RolUpdateRequest", description = "Payload para actualizar un rol existente")
public record RolUpdateRequest(
        @Schema(description = "Nueva descripción para el rol", example = "Usuario de ventas con acceso a contactos y conversaciones")
        String descripcion,

        @Schema(
                description = "Nuevo JSON de permisos granulados",
                example = """
                        {
                          "contactos": ["read","write"],
                          "conversaciones": ["read","write"],
                          "tareas": ["read"]
                        }
                        """
        )
        String permisosJson
) {}