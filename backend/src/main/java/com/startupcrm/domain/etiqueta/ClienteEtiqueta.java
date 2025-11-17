// =========================================
// src/main/java/com/startupcrm/domain/etiqueta/ClienteEtiqueta.java
// =========================================
package com.startupcrm.domain.etiqueta;

import com.startupcrm.domain.cliente.Cliente;
import jakarta.persistence.*;

@Entity
@Table(name = "cliente_etiqueta")
public class ClienteEtiqueta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;          // idClienteEtiqueta

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;  // Cliente etiquetado

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "etiqueta_id")
    private Etiqueta etiqueta; // Etiqueta aplicada

    // getters/setters...
}
