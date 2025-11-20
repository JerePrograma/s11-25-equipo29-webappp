// ------------------------------------------
// src/main/java/com/startupcrm/domain/conversacion/CanalIntegracionRepository.java
// ------------------------------------------
package com.startupcrm.domain.conversacion;

import java.util.List;
import java.util.Optional;

public interface CanalIntegracionRepository {

    CanalIntegracion save(CanalIntegracion canalIntegracion);

    Optional<CanalIntegracion> findById(Long id);

    List<CanalIntegracion> findByTipo(String tipo); // 'whatsapp','email'

    List<CanalIntegracion> findByActivoTrue();

    List<CanalIntegracion> findAll();

    void deleteById(Long id);
}