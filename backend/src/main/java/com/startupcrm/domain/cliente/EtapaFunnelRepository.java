// ------------------------------------------
// src/main/java/com/startupcrm/domain/cliente/EtapaFunnelRepository.java
// ------------------------------------------
package com.startupcrm.domain.cliente;

import java.util.List;
import java.util.Optional;

public interface EtapaFunnelRepository {

    EtapaFunnel save(EtapaFunnel etapa);

    Optional<EtapaFunnel> findById(Long id);

    Optional<EtapaFunnel> findByNombre(String nombre);

    Optional<EtapaFunnel> findByEsDefaultTrue();

    List<EtapaFunnel> findAll();

    void deleteById(Long id);
}