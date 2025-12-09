import React from "react";
import { Button } from "react-bootstrap";

/**
 * @param {{
 *   titulo?: string;
 *   subtitulo?: string;
 *   onAction?: () => void;
 *   actionLabel?: string;
 * }} props
 */
function Header({
  titulo = "Bienvenido a Startup CRM",
  subtitulo,
  onAction,
  actionLabel = "Ver más",
}) {
  return (
    <header className="bg-primary text-light py-4 py-md-5 mb-4 shadow-sm">
      <div className="container text-center">
        <h1 className="fw-bold mb-2 fs-2 fs-md-1">{titulo}</h1>
        {subtitulo && <p className="lead mb-4">{subtitulo}</p>}

        {onAction && (
          <Button variant="light" size="lg" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
