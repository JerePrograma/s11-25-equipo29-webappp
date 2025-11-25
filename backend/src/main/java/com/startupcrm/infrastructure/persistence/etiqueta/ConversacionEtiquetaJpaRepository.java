// ------------------------------------------
// src/main/java/com/startupcrm/infrastructure/persistence/etiqueta/ConversacionEtiquetaJpaRepository.java
// ------------------------------------------
package com.startupcrm.infrastructure.persistence.etiqueta;

import com.startupcrm.domain.etiqueta.ConversacionEtiqueta;
import com.startupcrm.domain.etiqueta.ConversacionEtiquetaRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConversacionEtiquetaJpaRepository
        extends JpaRepository<ConversacionEtiqueta, Long>, ConversacionEtiquetaRepository {
}