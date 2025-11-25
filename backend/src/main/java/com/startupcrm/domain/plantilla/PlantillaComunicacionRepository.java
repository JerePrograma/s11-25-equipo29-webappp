// ------------------------------------------
// src/main/java/com/startupcrm/domain/plantilla/PlantillaComunicacionRepository.java
// ------------------------------------------
package com.startupcrm.domain.plantilla;

import java.util.List;
import java.util.Optional;

public interface PlantillaComunicacionRepository {

    PlantillaComunicacion save(PlantillaComunicacion plantilla);

    Optional<PlantillaComunicacion> findById(Long id);

    List<PlantillaComunicacion> findByCanal(String canal); // 'whatsapp','email'

    void deleteById(Long id);
}