import React from "react";
import { Button } from "react-bootstrap";

function Header({ titulo = "Bienvenida al CRM Grupo 29", subtitulo, onAction }) {
  return (
    <header className="bg-primary text-light py-5 mb-4 shadow-sm">
      <div className="container text-center">
        <h1 className="fw-bold mb-2">{titulo}</h1>
        {subtitulo && <p className="lead mb-4">{subtitulo}</p>}

        {onAction && (
          <Button variant="light" size="lg" onClick={onAction}>
            Ver más
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;

