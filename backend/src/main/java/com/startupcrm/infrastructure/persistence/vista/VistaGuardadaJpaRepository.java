// ------------------------------------------
// src/main/java/com/startupcrm/infrastructure/persistence/vista/VistaGuardadaJpaRepository.java
// ------------------------------------------
package com.startupcrm.infrastructure.persistence.vista;

import com.startupcrm.domain.vista.VistaGuardada;
import com.startupcrm.domain.vista.VistaGuardadaRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VistaGuardadaJpaRepository
        extends JpaRepository<VistaGuardada, Long>, VistaGuardadaRepository {
}
