// =========================================
// src/main/java/com/startupcrm/domain/etiqueta/ConversacionEtiqueta.java
// =========================================
package com.startupcrm.domain.etiqueta;

import com.startupcrm.domain.conversacion.Conversacion;
import jakarta.persistence.*;

@Entity
@Table(name = "conversacion_etiqueta")
public class ConversacionEtiqueta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                    // idConversacionEtiqueta

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conversacion_id")
    private Conversacion conversacion;  // Conversación etiquetada

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "etiqueta_id")
    private Etiqueta etiqueta;          // Etiqueta aplicada

    // getters/setters...
}
