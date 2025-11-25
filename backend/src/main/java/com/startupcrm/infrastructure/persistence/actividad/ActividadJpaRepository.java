// ------------------------------------------
// src/main/java/com/startupcrm/infrastructure/persistence/actividad/ActividadJpaRepository.java
// ------------------------------------------
package com.startupcrm.infrastructure.persistence.actividad;

import com.startupcrm.domain.actividad.Actividad;
import com.startupcrm.domain.actividad.ActividadRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActividadJpaRepository
        extends JpaRepository<Actividad, Long>, ActividadRepository {
}