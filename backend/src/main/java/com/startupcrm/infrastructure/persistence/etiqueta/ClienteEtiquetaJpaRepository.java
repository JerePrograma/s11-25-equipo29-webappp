// ------------------------------------------
// src/main/java/com/startupcrm/infrastructure/persistence/etiqueta/ClienteEtiquetaJpaRepository.java
// ------------------------------------------
package com.startupcrm.infrastructure.persistence.etiqueta;

import com.startupcrm.domain.etiqueta.ClienteEtiqueta;
import com.startupcrm.domain.etiqueta.ClienteEtiquetaRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteEtiquetaJpaRepository
        extends JpaRepository<ClienteEtiqueta, Long>, ClienteEtiquetaRepository {
}