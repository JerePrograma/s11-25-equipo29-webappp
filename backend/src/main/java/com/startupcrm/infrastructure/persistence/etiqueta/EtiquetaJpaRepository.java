// ------------------------------------------
// src/main/java/com/startupcrm/infrastructure/persistence/etiqueta/EtiquetaJpaRepository.java
// ------------------------------------------
package com.startupcrm.infrastructure.persistence.etiqueta;

import com.startupcrm.domain.etiqueta.Etiqueta;
import com.startupcrm.domain.etiqueta.EtiquetaRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EtiquetaJpaRepository
        extends JpaRepository<Etiqueta, Long>, EtiquetaRepository {
}