// src/main/java/com/startupcrm/infrastructure/persistence/usuario/UsuarioJpaRepository.java
package com.startupcrm.infrastructure.persistence.plantilla.usuario;

import com.startupcrm.domain.usuario.Usuario;
import com.startupcrm.domain.usuario.UsuarioRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioJpaRepository
        extends JpaRepository<Usuario, Long>, UsuarioRepository {

    // Spring Data implementa esto y satisface UsuarioRepository.findByEmail
    @Override
    Optional<Usuario> findByEmail(String email);
}
