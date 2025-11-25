// ------------------------------------------
// src/main/java/com/startupcrm/infrastructure/persistence/conversacion/ConversacionJpaRepository.java
// ------------------------------------------
package com.startupcrm.infrastructure.persistence.conversacion;

import com.startupcrm.domain.conversacion.Conversacion;
import com.startupcrm.domain.conversacion.ConversacionRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConversacionJpaRepository
        extends JpaRepository<Conversacion, Long>, ConversacionRepository {
}
