// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/index.css";

import App from "./App.jsx";

// Páginas
import Dashboard from "./pages/dashboard.jsx";
import ContactosPage from "./pages/contactos/ContactosPage.jsx";
import VerContacto from "./pages/contactos/VerContacto.jsx";

import Mensajes from "./pages/mensajes.jsx";
import Login from "./components/login.jsx";
import Register from "./components/register.jsx";
import Leads from "./pages/leads.jsx";

import TareasPage from "./pages/tareas/TareasPage.jsx";
import UsuariosPage from "./pages/usuarios/UsuariosPage.jsx";
import RolesPage from "./pages/roles/RolesPage.jsx";

import ConfiguracionVistasEtiquetas from "./pages/ConfiguracionVistasEtiquetas.jsx";
import NoAutorizado from "./pages/NoAutorizado.jsx";
import About from "./components/About.jsx";

// Contextos
import { AuthProvider } from "./context/authcontext.jsx";
import { LeadProvider } from "./context/leadcontext.jsx";
import { TaskProvider } from "./context/taskcontext.jsx";
import { ConfigProvider } from "./context/configcontext.jsx";
import { UserProvider } from "./context/usercontext.jsx";
import { RolesProvider } from "./context/rolescontext.jsx";

// Rutas protegidas
import ProtectedRoute from "./components/protectedroute.jsx";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        {/* Orden: mantenemos los providers originales y sumamos User/Roles */}
        <LeadProvider>
          <TaskProvider>
            <ConfigProvider>
              <UserProvider>
                <RolesProvider>
                  <Routes>
                    {/* Shell principal con sidebar / visitor layout */}
                    <Route path="/" element={<App />}>
                      {/* DASHBOARD (puede ser público o luego envolver con ProtectedRoute si querés) */}
                      <Route index element={<Dashboard />} />

                      {/* CONTACTOS */}
                      <Route
                        path="contactos"
                        element={
                          <ProtectedRoute roles={["admin", "vendedor"]}>
                            <ContactosPage />
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

                      {/* LEADS (si lo mantenés como módulo separado) */}
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
                        element=
                        {
                          <ProtectedRoute roles={["admin", "vendedor"]}>
                            <TareasPage />
                          </ProtectedRoute>
                        }
                      />

                      {/* USUARIOS — solo admin */}
                      <Route
                        path="usuarios"
                        element={
                          <ProtectedRoute roles={["admin"]}>
                            <UsuariosPage />
                          </ProtectedRoute>
                        }
                      />

                      {/* ROLES — solo admin */}
                      <Route
                        path="roles"
                        element={
                          <ProtectedRoute roles={["admin"]}>
                            <RolesPage />
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

                      {/* ABOUT — accesible también para externos */}
                      <Route
                        path="about"
                        element={
                          <ProtectedRoute roles={["admin", "vendedor", "externo"]}>
                            <About />
                          </ProtectedRoute>
                        }
                      />
                    </Route>

                    {/* RUTAS PÚBLICAS */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/no-autorizado" element={<NoAutorizado />} />
                  </Routes>
                </RolesProvider>
              </UserProvider>
            </ConfigProvider>
          </TaskProvider>
        </LeadProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
