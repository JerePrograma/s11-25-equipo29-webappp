// src/main/java/com/startupcrm/api/plantilla/PlantillaComunicacionApiMapper.java
package com.startupcrm.api.plantilla;

import com.startupcrm.domain.plantilla.PlantillaComunicacion;
import org.springframework.stereotype.Component;

@Component
public class PlantillaComunicacionApiMapper {

    public PlantillaResponse toResponse(PlantillaComunicacion p) {
        return new PlantillaResponse(
                p.getId(),
                p.getCanal(),
                p.getNombre(),
                p.getAsunto(),
                p.getCuerpo(),
                p.getVariablesJson(),
                p.getCreadoEn()
        );
    }
}
