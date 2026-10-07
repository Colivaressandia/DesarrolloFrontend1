/* =========================================================================
   main.jsx — Punto de entrada de la aplicación React
   Semana 7 — Desarrollo Frontend I (PFY2201)
   -------------------------------------------------------------------------
   Responsabilidad:
     1. Importar React y ReactDOM.
     2. Importar el componente raíz <App />.
     3. Importar los estilos globales.
     4. Montar <App /> dentro del <div id="root"> definido en index.html.

   🔗 Conexión con index.html:
     document.getElementById("root")  ←→  <div id="root"></div>
     Si el id no coincide, la app NO se renderiza.
   ========================================================================= */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Estilos globales (tema oscuro). Vite los inyecta automáticamente en <head>.
// Si decides usar Bootstrap, descomenta la línea siguiente:
// import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

// Montaje de la aplicación en el DOM real.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* StrictMode ayuda a detectar efectos secundarios en desarrollo.
        No afecta al build de producción. */}
    <App />
  </React.StrictMode>
);