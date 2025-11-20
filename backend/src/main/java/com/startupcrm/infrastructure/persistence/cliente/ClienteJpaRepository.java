// ------------------------------------------
// src/main/java/com/startupcrm/infrastructure/persistence/cliente/ClienteJpaRepository.java
// ------------------------------------------
package com.startupcrm.infrastructure.persistence.cliente;

import com.startupcrm.domain.cliente.Cliente;
import com.startupcrm.domain.cliente.ClienteRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteJpaRepository
        extends JpaRepository<Cliente, Long>, ClienteRepository {
}