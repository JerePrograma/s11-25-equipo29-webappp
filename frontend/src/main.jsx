// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/index.css";

import App from "./App.jsx";

// Páginas
import Dashboard from "./pages/dashboard.jsx";
import Contactos from "./pages/Contactos/index.jsx";
import Mensajes from "./pages/mensajes.jsx";
import Login from "./components/login.jsx";
import Usuarios from "./pages/usuarios.jsx";
import Register from "./components/register.jsx";
import Leads from "./pages/leads.jsx";
import Tareas from "./pages/tareas.jsx";
import ConfiguracionVistasEtiquetas from "./pages/ConfiguracionVistasEtiquetas.jsx";
import NoAutorizado from "./pages/NoAutorizado.jsx";
import VerContacto from "./pages/contactos/VerContacto.jsx";
import About from "./components/About.jsx"; // ⭐ NUEVO

// Contextos
import { AuthProvider } from "./context/authcontext.jsx";
import { LeadProvider } from "./context/leadcontext.jsx";
import { TaskProvider } from "./context/taskcontext.jsx";
import { ConfigProvider } from "./context/configcontext.jsx";

// Rutas protegidas
import ProtectedRoute from "./components/protectedroute.jsx";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <LeadProvider>
          <TaskProvider>
            <ConfigProvider>

              <Routes>

                {/* 🌟 RUTA PRINCIPAL QUE USA App.jsx (SIDEBAR + OUTLET) */}
                <Route path="/" element={<App />}>

                  {/* DASHBOARD */}
                  <Route index element={<Dashboard />} />

                  {/* CONTACTOS */}
                  <Route
                    path="contactos"
                    element={
                      <ProtectedRoute roles={["admin", "vendedor"]}>
                        <Contactos />
                      </ProtectedRoute>
                    }
                  />

                  {/* FICHA INDIVIDUAL DEL CONTACTO */}
                  <Route
                    path="contactos/:id"
                    element={
                      <ProtectedRoute roles={["admin", "vendedor"]}>
                        <VerContacto />
                      </ProtectedRoute>
                    }
                  />

                  {/* LEADS */}
                  <Route
                    path="leads"
                    element={
                      <ProtectedRoute roles={["admin", "vendedor"]}>
                        <Leads />
                      </ProtectedRoute>
                    }
                  />

                  {/* MENSAJES */}
                  <Route
                    path="mensajes"
                    element={
                      <ProtectedRoute roles={["admin", "vendedor"]}>
                        <Mensajes />
                      </ProtectedRoute>
                    }
                  />

                  {/* TAREAS */}
                  <Route
                    path="tareas"
                    element={
                      <ProtectedRoute roles={["admin", "vendedor"]}>
                        <Tareas />
                      </ProtectedRoute>
                    }
                  />

                  {/* USUARIOS — solo admin */}
                  <Route
                    path="usuarios"
                    element={
                      <ProtectedRoute roles={["admin"]}>
                        <Usuarios />
                      </ProtectedRoute>
                    }
                  />

                  {/* CONFIGURACIÓN — solo admin */}
                  <Route
                    path="configuracion/vistas"
                    element={
                      <ProtectedRoute roles={["admin"]}>
                        <ConfiguracionVistasEtiquetas />
                      </ProtectedRoute>
                    }
                  />

                  {/* ⭐ ABOUT — accesible también para externos */}
                  <Route
                    path="about"
                    element={
                      <ProtectedRoute roles={["admin", "vendedor", "externo"]}>
                        <About />
                      </ProtectedRoute>
                    }
                  />

                </Route>

                {/* ⭐ RUTAS PUBLICAS */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/no-autorizado" element={<NoAutorizado />} />

              </Routes>

            </ConfigProvider>
          </TaskProvider>
        </LeadProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
