// src/main/java/com/startupcrm/application/etiqueta/ClienteEtiquetaService.java
package com.startupcrm.application.etiqueta;

import com.startupcrm.domain.cliente.Cliente;
import com.startupcrm.domain.etiqueta.ClienteEtiqueta;
import com.startupcrm.domain.etiqueta.ClienteEtiquetaRepository;
import com.startupcrm.domain.etiqueta.Etiqueta;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteEtiquetaService {

    private final ClienteEtiquetaRepository clienteEtiquetaRepository;

    public ClienteEtiquetaService(ClienteEtiquetaRepository clienteEtiquetaRepository) {
        this.clienteEtiquetaRepository = clienteEtiquetaRepository;
    }

    public ClienteEtiqueta asignarEtiquetaACliente(Cliente cliente, Etiqueta etiqueta) {
        ClienteEtiqueta ce = new ClienteEtiqueta();
        ce.setCliente(cliente);
        ce.setEtiqueta(etiqueta);
        return clienteEtiquetaRepository.save(ce);
    }

    public List<ClienteEtiqueta> listarPorCliente(Cliente cliente) {
        return clienteEtiquetaRepository.findByCliente(cliente);
    }

    public void eliminar(ClienteEtiqueta ce) {
        clienteEtiquetaRepository.delete(ce);
    }

    public void eliminarPorCliente(Cliente cliente) {
        clienteEtiquetaRepository.deleteByCliente(cliente);
    }
}