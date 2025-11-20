// ------------------------------------------
// src/main/java/com/startupcrm/domain/etiqueta/ClienteEtiquetaRepository.java
// ------------------------------------------
package com.startupcrm.domain.etiqueta;

import com.startupcrm.domain.cliente.Cliente;

import java.util.List;

public interface ClienteEtiquetaRepository {

    ClienteEtiqueta save(ClienteEtiqueta clienteEtiqueta);

    List<ClienteEtiqueta> findByCliente(Cliente cliente);

    void delete(ClienteEtiqueta clienteEtiqueta);

    void deleteByCliente(Cliente cliente);
}