// =========================================
// src/main/java/com/startupcrm/domain/mensaje/Mensaje.java
// =========================================
package com.startupcrm.domain.mensaje;

import com.startupcrm.domain.conversacion.Conversacion;
import com.startupcrm.domain.usuario.Usuario;
import com.startupcrm.domain.cliente.Cliente;
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
@Table(name = "mensaje")
public class Mensaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                      // idMensaje

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conversacion_id")
    private Conversacion conversacion;    // Conversación

    private String canal;                // 'whatsapp' o 'email'

    private String direccion;            // 'in' o 'out'

    @Column(columnDefinition = "TEXT")
    private String contenido;            // Cuerpo del mensaje

    private OffsetDateTime fechaEnvio;   // Envío/recepción

    private String estado;               // 'enviado','entregado','leido','error'

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "remitente_usuario_id")
    private Usuario remitenteUsuario;    // Usuario remitente (si aplica)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "remitente_cliente_id")
    private Cliente remitenteCliente;    // Cliente remitente (si aplica)

    private String canalMessageId;       // ID mensaje en proveedor

    private String idempotencyKey;       // Clave anti-duplicados

    @Column(name = "payload_raw", columnDefinition = "TEXT")
    private String payloadRaw;           // Payload crudo (JSON)

    private OffsetDateTime creadoEn;     // Registro interno

    // getters/setters...
}
