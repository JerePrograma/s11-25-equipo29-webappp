// ------------------------------------------
// src/main/java/com/startupcrm/domain/cliente/ClienteRepository.java
// ------------------------------------------
package com.startupcrm.domain.cliente;

import java.util.List;
import java.util.Optional;

public interface ClienteRepository {

    Cliente save(Cliente cliente);

    Optional<Cliente> findById(Long id);

    Optional<Cliente> findByEmail(String email);

    List<Cliente> findAll();

    List<Cliente> findByEstadoGeneral(String estadoGeneral);

    void deleteById(Long id);
}