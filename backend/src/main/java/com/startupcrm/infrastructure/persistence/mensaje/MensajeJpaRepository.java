// ------------------------------------------
// src/main/java/com/startupcrm/infrastructure/persistence/mensaje/MensajeJpaRepository.java
// ------------------------------------------
package com.startupcrm.infrastructure.persistence.mensaje;

import com.startupcrm.domain.mensaje.Mensaje;
import com.startupcrm.domain.mensaje.MensajeRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MensajeJpaRepository
        extends JpaRepository<Mensaje, Long>, MensajeRepository {
}