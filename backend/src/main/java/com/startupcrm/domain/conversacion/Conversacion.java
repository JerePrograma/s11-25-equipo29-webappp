// =========================================
// src/main/java/com/startupcrm/domain/conversacion/Conversacion.java
// =========================================
package com.startupcrm.domain.conversacion;

import com.startupcrm.domain.cliente.Cliente;
import com.startupcrm.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "conversacion")
public class Conversacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                       // idConversacion

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;               // Cliente asociado

    private String canal;                 // 'whatsapp' o 'email'

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "canal_integracion_id")
    private CanalIntegracion canalIntegracion; // Config de canal usada

    private String asunto;                // Asunto (email)

    private String estado;                // 'abierta','cerrada','pendiente'

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asignado_a_id")
    private Usuario asignadoA;            // Usuario responsable

    private String canalConversationId;   // ID de hilo en proveedor externo

    private OffsetDateTime ultimoMensajeEn; // Último mensaje

    private OffsetDateTime creadoEn;      // Creación

    // getters/setters...
}
