// ------------------------------------------
// src/main/java/com/startupcrm/infrastructure/persistence/plantilla/PlantillaComunicacionJpaRepository.java
// ------------------------------------------
package com.startupcrm.infrastructure.persistence.plantilla;

import com.startupcrm.domain.plantilla.PlantillaComunicacion;
import com.startupcrm.domain.plantilla.PlantillaComunicacionRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlantillaComunicacionJpaRepository
        extends JpaRepository<PlantillaComunicacion, Long>, PlantillaComunicacionRepository {
}
