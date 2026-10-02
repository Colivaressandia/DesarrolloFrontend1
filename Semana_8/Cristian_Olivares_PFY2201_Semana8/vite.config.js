/* =========================================================================
   vite.config.js — Configuración de Vite
   Semana 8 — Desarrollo Frontend I (PFY2201)
   -------------------------------------------------------------------------
   Base: ruta completa donde se servirá la app en GitHub Pages.
   Como subimos el build manualmente, la URL final es:
     https://colivaressandia.github.io/DesarrolloFrontend1/Semana_8/Cristian_Olivares_PFY2201_Semana8/
   ========================================================================= */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/DesarrolloFrontend1/Semana_8/Cristian_Olivares_PFY2201_Semana8/dist/",
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    emptyOutDir: true,
  },
});
