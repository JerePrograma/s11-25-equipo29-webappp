// src/main/java/com/startupcrm/api/usuario/RolApiMapper.java
package com.startupcrm.api.usuario;

import com.startupcrm.domain.usuario.Rol;
import org.springframework.stereotype.Component;

@Component
public class RolApiMapper {

    public RolResponse toResponse(Rol rol) {
        return new RolResponse(
                rol.getId(),
                rol.getNombre(),
                rol.getDescripcion(),
                rol.getPermisosJson()
        );
    }

    public void updateEntity(Rol rol, RolUpdateRequest request) {
        rol.setDescripcion(request.descripcion());
        rol.setPermisosJson(request.permisosJson());
    }
}
