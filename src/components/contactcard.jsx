function ContactCard({ nombre, email, telefono, estado = "activo", empresa }) {
    const badge = {
      activo: "success",
      seguimiento: "warning",
      inactivo: "secondary",
      perdido: "danger",
    }[estado] || "secondary";
  
    return (
      <div className="card shadow-sm mb-3">
        <div className="card-body d-flex justify-content-between align-items-start">
          <div>
            <h5 className="card-title mb-1">{nombre}</h5>
            {empresa && <div className="text-muted small">{empresa}</div>}
            <p className="card-text mb-1">{email}</p>
            {telefono && <p className="card-text mb-0">{telefono}</p>}
          </div>
  
          <span className={`badge bg-${badge} text-uppercase`} style={{ letterSpacing: ".5px" }}>
            {estado}
          </span>
        </div>
      </div>
    );
  }
  
  export default ContactCard;
  