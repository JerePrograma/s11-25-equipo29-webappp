// ------------------------------------------
// src/main/java/com/startupcrm/domain/conversacion/ConversacionRepository.java
// ------------------------------------------
package com.startupcrm.domain.conversacion;

import com.startupcrm.domain.cliente.Cliente;

import java.util.List;
import java.util.Optional;

public interface ConversacionRepository {

    Conversacion save(Conversacion conversacion);

    Optional<Conversacion> findById(Long id);

    List<Conversacion> findByCliente(Cliente cliente);

    List<Conversacion> findByEstado(String estado);

    Optional<Conversacion> findByCanalConversationId(String canalConversationId);

    List<Conversacion> findAll();

    void deleteById(Long id);
}
