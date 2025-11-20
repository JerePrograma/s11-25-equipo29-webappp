// =========================================
// src/main/java/com/startupcrm/domain/cliente/Cliente.java
// =========================================
package com.startupcrm.domain.cliente;

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
@Table(name = "cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                       // idCliente

    private String nombre;                 // Nombre persona/empresa

    private String email;                  // Email de contacto

    private String telefono;               // Teléfono (WhatsApp, etc.)

    private String tipo;                   // 'lead' o 'cliente'

    private String estadoGeneral;          // 'activo','en_seguimiento','perdido'

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "etapa_funnel_id")
    private EtapaFunnel etapaFunnel;       // Etapa actual del funnel

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "propietario_id")
    private Usuario propietario;           // Usuario owner del cliente

    private String origen;                 // 'landing','referido','manual','import', etc.

    private OffsetDateTime ultimoContactoEn; // Último contacto

    private OffsetDateTime creadoEn;       // Alta en el CRM

    // getters/setters...
}
