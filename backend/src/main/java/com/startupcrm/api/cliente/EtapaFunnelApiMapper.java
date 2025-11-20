// src/main/java/com/startupcrm/api/cliente/EtapaFunnelApiMapper.java
package com.startupcrm.api.cliente;

import com.startupcrm.domain.cliente.EtapaFunnel;
import org.springframework.stereotype.Component;

@Component
public class EtapaFunnelApiMapper {

    public EtapaFunnelResponse toResponse(EtapaFunnel etapa) {
        return new EtapaFunnelResponse(
                etapa.getId(),
                etapa.getNombre(),
                etapa.getOrden(),
                etapa.isEsDefault()
        );
    }
}
