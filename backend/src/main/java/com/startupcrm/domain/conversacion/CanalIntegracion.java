// =========================================
// src/main/java/com/startupcrm/domain/conversacion/CanalIntegracion.java
// =========================================
package com.startupcrm.domain.conversacion;

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
@Table(name = "canal_integracion")
public class CanalIntegracion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                 // idCanalIntegracion

    private String tipo;             // 'whatsapp' o 'email'

    private String nombre;           // Nombre interno (WhatsApp Ventas, etc.)

    @Column(name = "config_json", columnDefinition = "TEXT")
    private String configJson;       // Configuración JSON (tokens, ids, etc.)

    private boolean activo;          // Canal habilitado

    private OffsetDateTime creadoEn; // Creación

    // getters/setters...
}
