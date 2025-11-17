// =========================================
// src/main/java/com/startupcrm/domain/tarea/Tarea.java
// =========================================
package com.startupcrm.domain.tarea;

import com.startupcrm.domain.cliente.Cliente;
import com.startupcrm.domain.conversacion.Conversacion;
import com.startupcrm.domain.usuario.Usuario;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity
@Table(name = "tarea")
public class Tarea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                      // idTarea

    private String titulo;               // Título breve

    @Column(columnDefinition = "TEXT")
    private String descripcion;          // Descripción

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;             // Cliente asociado (opcional)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conversacion_id")
    private Conversacion conversacion;   // Conversación asociada (opcional)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asignado_a_id")
    private Usuario asignadoA;           // Usuario responsable

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creado_por_id")
    private Usuario creadoPor;           // Usuario creador

    private LocalDate fechaLimite;       // Fecha objetivo

    private String estado;               // 'pendiente','en_progreso','completada','cancelada'

    private String prioridad;            // 'baja','media','alta'

    private OffsetDateTime recordatorioEn; // Momento de recordatorio

    private OffsetDateTime creadoEn;     // Creación

    private OffsetDateTime completadaEn; // Cierre real

    // getters/setters...
}
