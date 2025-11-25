// ------------------------------------------
// src/main/java/com/startupcrm/domain/usuario/RolRepository.java
// ------------------------------------------
package com.startupcrm.domain.usuario;

import java.util.List;
import java.util.Optional;

public interface RolRepository {

    Rol save(Rol rol);

    Optional<Rol> findById(Long id);

    Optional<Rol> findByNombre(String nombre);

    List<Rol> findAll();
}