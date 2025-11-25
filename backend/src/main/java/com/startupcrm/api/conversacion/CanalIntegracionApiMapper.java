// src/main/java/com/startupcrm/api/conversacion/CanalIntegracionApiMapper.java
package com.startupcrm.api.conversacion;

import com.startupcrm.domain.conversacion.CanalIntegracion;
import org.springframework.stereotype.Component;

@Component
public class CanalIntegracionApiMapper {

    public CanalIntegracionResponse toResponse(CanalIntegracion c) {
        return new CanalIntegracionResponse(
                c.getId(),
                c.getTipo(),
                c.getNombre(),
                c.getConfigJson(),
                c.isActivo(),
                c.getCreadoEn()
        );
    }
}
