// ------------------------------------------
// src/main/java/com/startupcrm/domain/etiqueta/EtiquetaRepository.java
// ------------------------------------------
package com.startupcrm.domain.etiqueta;

import java.util.List;
import java.util.Optional;

public interface EtiquetaRepository {

    Etiqueta save(Etiqueta etiqueta);

    Optional<Etiqueta> findById(Long id);

    Optional<Etiqueta> findByNombreAndAplicaA(String nombre, String aplicaA);

    List<Etiqueta> findByAplicaA(String aplicaA);

    void deleteById(Long id);
}