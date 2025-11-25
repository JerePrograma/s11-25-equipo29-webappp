// src/main/java/com/startupcrm/api/cliente/ClienteApiMapper.java
package com.startupcrm.api.cliente;

import com.startupcrm.domain.cliente.Cliente;
import com.startupcrm.domain.cliente.EtapaFunnel;
import com.startupcrm.domain.usuario.Usuario;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ClienteApiMapper {

    public ClienteResponse toResponse(Cliente c, List<String> etiquetas) {
        EtapaFunnel etapa = c.getEtapaFunnel();
        Usuario propietario = c.getPropietario();

        return new ClienteResponse(
                c.getId(),
                c.getNombre(),
                c.getEmail(),
                c.getTelefono(),
                c.getTipo(),
                c.getEstadoGeneral(),
                etapa != null ? etapa.getId() : null,
                etapa != null ? etapa.getNombre() : null,
                propietario != null ? propietario.getId() : null,
                propietario != null ? propietario.getNombre() : null,
                c.getOrigen(),
                c.getUltimoContactoEn(),
                c.getCreadoEn(),
                etiquetas
        );
    }
}
