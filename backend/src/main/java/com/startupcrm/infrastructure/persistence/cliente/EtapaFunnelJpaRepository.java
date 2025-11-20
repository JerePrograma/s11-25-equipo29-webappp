// ------------------------------------------
// src/main/java/com/startupcrm/infrastructure/persistence/cliente/EtapaFunnelJpaRepository.java
// ------------------------------------------
package com.startupcrm.infrastructure.persistence.cliente;

import com.startupcrm.domain.cliente.EtapaFunnel;
import com.startupcrm.domain.cliente.EtapaFunnelRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EtapaFunnelJpaRepository
        extends JpaRepository<EtapaFunnel, Long>, EtapaFunnelRepository {
}