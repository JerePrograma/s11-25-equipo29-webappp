// =========================================
// src/main/java/com/startupcrm/domain/actividad/Actividad.java
// =========================================
package com.startupcrm.domain.actividad;

import com.startupcrm.domain.cliente.Cliente;
import com.startupcrm.domain.usuario.Usuario;
import com.startupcrm.domain.conversacion.Conversacion;
import com.startupcrm.domain.tarea.Tarea;
import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "actividad")
public class Actividad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                        // idActividad

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;                // Cliente afectado

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;                // Usuario actor (opcional)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conversacion_id")
    private Conversacion conversacion;      // Conversación asociada (opcional)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tarea_id")
    private Tarea tarea;                    // Tarea asociada (opcional)

    private String tipo;                    // Tipo evento: 'cliente_creado', etc.

    private OffsetDateTime fecha;           // Momento del evento

    @Column(name = "metadata_json", columnDefinition = "TEXT")
    private String metadataJson;            // Datos adicionales (JSON)

    // getters/setters...
}
