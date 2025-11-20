// ------------------------------------------
// src/main/java/com/startupcrm/infrastructure/persistence/conversacion/CanalIntegracionJpaRepository.java
// ------------------------------------------
package com.startupcrm.infrastructure.persistence.conversacion;

import com.startupcrm.domain.conversacion.CanalIntegracion;
import com.startupcrm.domain.conversacion.CanalIntegracionRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CanalIntegracionJpaRepository
        extends JpaRepository<CanalIntegracion, Long>, CanalIntegracionRepository {
}
