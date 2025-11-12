import React from "react";
import NavBar from "./components/NavBar.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <main className="container py-4">
        <Outlet />
      </main>
    </>
  );
}

export default App;
