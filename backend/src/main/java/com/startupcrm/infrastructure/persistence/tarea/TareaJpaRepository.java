// ------------------------------------------
// src/main/java/com/startupcrm/infrastructure/persistence/tarea/TareaJpaRepository.java
// ------------------------------------------
package com.startupcrm.infrastructure.persistence.tarea;

import com.startupcrm.domain.tarea.Tarea;
import com.startupcrm.domain.tarea.TareaRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TareaJpaRepository
        extends JpaRepository<Tarea, Long>, TareaRepository {
}