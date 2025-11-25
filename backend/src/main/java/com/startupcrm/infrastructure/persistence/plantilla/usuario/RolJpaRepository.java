// ------------------------------------------
// src/main/java/com/startupcrm/infrastructure/persistence/usuario/RolJpaRepository.java
// ------------------------------------------
package com.startupcrm.infrastructure.persistence.plantilla.usuario;

import com.startupcrm.domain.usuario.Rol;
import com.startupcrm.domain.usuario.RolRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolJpaRepository
        extends JpaRepository<Rol, Long>, RolRepository {
}
