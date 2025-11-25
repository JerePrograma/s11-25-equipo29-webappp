// src/main/java/com/startupcrm/api/etiqueta/EtiquetaApiMapper.java
package com.startupcrm.api.etiqueta;

import com.startupcrm.domain.etiqueta.Etiqueta;
import org.springframework.stereotype.Component;

@Component
public class EtiquetaApiMapper {

    public EtiquetaResponse toResponse(Etiqueta e) {
        return new EtiquetaResponse(
                e.getId(),
                e.getNombre(),
                e.getColor(),
                e.getAplicaA()
        );
    }
}
