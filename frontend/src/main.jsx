import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";

// Vistas//////////////////////////////////////////////////////////////////////////////////
import Dashboard from "./pages/dashboard.jsx";
import Contactos from "./pages/contactos.jsx";  
import Mensajes  from "./pages/mensajes.jsx";
import Configuracion  from "./pages/configuracion.jsx";
import Login  from "./components/login.jsx";




import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Register from "./components/register.jsx";
///////////////////////////////////////////////////////////////////////////////////////////// 




ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
     
          {/*  NUEVA RUTA */}
          <Route path="contactos" element={<Contactos />} />
          <Route path="mensajes" element={<Mensajes />} />
          <Route path="configuracion" element={<Configuracion/>} />
          <Route path="login" element={<Login/>} />
          <Route path="Register" element={<Register/>} />



        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
