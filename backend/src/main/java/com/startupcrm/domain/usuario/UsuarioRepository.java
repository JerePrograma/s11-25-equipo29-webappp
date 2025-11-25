// src/main/java/com/startupcrm/domain/usuario/UsuarioRepository.java
package com.startupcrm.domain.usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository {

    Usuario save(Usuario usuario);

    Optional<Usuario> findById(Long id);

    Optional<Usuario> findByEmail(String email);

    boolean existsByEmail(String email);

    List<Usuario> findAll();

    void deleteById(Long id);
}
