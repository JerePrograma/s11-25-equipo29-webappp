// =========================================
// src/main/java/com/startupcrm/domain/cliente/EtapaFunnel.java
// =========================================
package com.startupcrm.domain.cliente;

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
@Table(name = "etapa_funnel")
public class EtapaFunnel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;           // idEtapaFunnel

    private String nombre;     // Nombre de la etapa del funnel

    private Integer orden;     // Orden en el funnel

    private boolean esDefault; // Es etapa inicial por defecto

    // getters/setters...
}
