// src/main/java/com/startupcrm/api/usuario/UsuarioApiMapper.java
package com.startupcrm.api.usuario;

import com.startupcrm.domain.usuario.Rol;
import com.startupcrm.domain.usuario.Usuario;
import org.springframework.stereotype.Component;

@Component
public class UsuarioApiMapper {

    public UsuarioResponse toResponse(Usuario usuario) {
        Rol rol = usuario.getRol();
        return new UsuarioResponse(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getEmail(),
                usuario.getTelefono(),
                usuario.getEstado(),
                rol != null ? rol.getId() : null,
                rol != null ? rol.getNombre() : null,
                usuario.getCreadoEn(),
                usuario.getUltimoLoginEn()
        );
    }

    public void updateEntity(Usuario usuario, UsuarioUpdateRequest request) {
        usuario.setNombre(request.nombre());
        usuario.setTelefono(request.telefono());
        usuario.setEstado(request.estado());
        // rol se setea desde servicio buscando por id (no acá)
    }
}
