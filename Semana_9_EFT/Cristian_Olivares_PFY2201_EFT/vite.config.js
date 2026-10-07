/* =========================================================================
   vite.config.js — Configuración de Vite
   Evaluación Final Transversal — Desarrollo Frontend I (PFY2201)
   -------------------------------------------------------------------------
   La base relativa permite publicar el build en GitHub Pages dentro de una
   carpeta del repositorio sin romper las rutas de datos ni las imágenes.
   ========================================================================= */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
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