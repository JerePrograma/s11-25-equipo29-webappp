// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";

// Vistas
import Dashboard from "./pages/dashboard.jsx";
import Contactos from "./pages/contactos.jsx";
import Mensajes from "./pages/mensajes.jsx";
import Configuracion from "./pages/configuracion.jsx";
import Login from "./components/login.jsx";
import Usuarios from "./pages/usuarios.jsx";
import Register from "./components/register.jsx";
import Leads from "./pages/leads.jsx";
import Tareas from "./pages/tareas.jsx";          // 👈 NUEVO

// 💛 Context
import { LeadProvider } from "./context/leadcontext.jsx";
import { TaskProvider } from "./context/taskcontext.jsx"; // 👈 NUEVO

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 👇 Todo lo que está adentro va a poder usar useLeads() y useTasks() */}
      <LeadProvider>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Dashboard />} />
              <Route path="leads" element={<Leads />} />
              <Route path="contactos" element={<Contactos />} />
              <Route path="mensajes" element={<Mensajes />} />
              <Route path="tareas" element={<Tareas />} />   {/* 👈 NUEVA RUTA */}
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="usuarios" element={<Usuarios />} />
              {/* Si usás Configuración, agregala también */}
              {/* <Route path="configuracion" element={<Configuracion />} /> */}
            </Route>
          </Routes>
        </TaskProvider>
      </LeadProvider>
    </BrowserRouter>
  </React.StrictMode>
);
