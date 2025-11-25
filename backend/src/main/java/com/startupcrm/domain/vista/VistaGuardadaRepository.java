// ------------------------------------------
// src/main/java/com/startupcrm/domain/vista/VistaGuardadaRepository.java
// ------------------------------------------
package com.startupcrm.domain.vista;

import com.startupcrm.domain.usuario.Usuario;

import java.util.List;
import java.util.Optional;

public interface VistaGuardadaRepository {

    VistaGuardada save(VistaGuardada vista);

    Optional<VistaGuardada> findById(Long id);

    List<VistaGuardada> findByUsuario(Usuario usuario);

    List<VistaGuardada> findByEsPublicaTrue();

    void deleteById(Long id);
}