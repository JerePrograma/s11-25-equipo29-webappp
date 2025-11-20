// =========================================
// src/main/java/com/startupcrm/domain/etiqueta/ClienteEtiqueta.java
// =========================================
package com.startupcrm.domain.etiqueta;

import com.startupcrm.domain.cliente.Cliente;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
