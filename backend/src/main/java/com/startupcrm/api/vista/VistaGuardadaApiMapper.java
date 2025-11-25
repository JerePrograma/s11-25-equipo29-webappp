// src/main/java/com/startupcrm/api/vista/VistaGuardadaApiMapper.java
package com.startupcrm.api.vista;

import com.startupcrm.domain.usuario.Usuario;
import com.startupcrm.domain.vista.VistaGuardada;
import org.springframework.stereotype.Component;

@Component
public class VistaGuardadaApiMapper {

    public VistaGuardadaResponse toResponse(VistaGuardada v) {
        Usuario usuario = v.getUsuario();
        return new VistaGuardadaResponse(
                v.getId(),
                v.getEntidad(),
                v.getNombre(),
                v.getFiltrosJson(),
                v.getColumnasJson(),
                v.isEsPublica(),
                usuario != null ? usuario.getId() : null,
                usuario != null ? usuario.getNombre() : null,
                v.getCreadoEn()
        );
    }
}
