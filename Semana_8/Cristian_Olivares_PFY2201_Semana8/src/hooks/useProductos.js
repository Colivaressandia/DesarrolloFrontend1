/* =========================================================================
   useProductos — Custom Hook para cargar el catálogo de productos
   Semana 8 — Desarrollo Frontend I (PFY2201)
   -------------------------------------------------------------------------
   Encapsula:
     1. El fetch al JSON con manejo de errores (HTTP y red).
     2. Los estados de carga y error.
     3. La transformación de rutas de imagen con BASE_URL.

   Devuelve:
     • productos  (Array)    - Catálogo cargado con rutas completas.
     • cargando   (Boolean)  - true mientras se ejecuta el fetch.
     • error      (String)   - Mensaje de error si algo falla.
     • recargar   (Function) - Permite reintentar la carga manualmente.
   ========================================================================= */

import { useState, useEffect, useCallback } from "react";

export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // useCallback evita que la función se recree en cada render,
  // permitiendo usarla como dependencia estable en el useEffect.
  const cargar = useCallback(async () => {
    try {
      setCargando(true);
      setError(null);

      const url = `${import.meta.env.BASE_URL}data/productos.json`;
      const respuesta = await fetch(url);

      if (!respuesta.ok) {
        throw new Error(`HTTP ${respuesta.status}: ${respuesta.statusText}`);
      }

      const data = await respuesta.json();

      // Prepend BASE_URL a las imágenes (el JSON no puede usar import.meta.env)
      const productosConRuta = data.map((p) => ({
        ...p,
        imagen: `${import.meta.env.BASE_URL}${p.imagen}`,
      }));

      setProductos(productosConRuta);
    } catch (err) {
      console.error("❌ Error al cargar productos:", err);
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  // Carga automática al montar el componente
  useEffect(() => {
    cargar();
  }, [cargar]);

  return { productos, cargando, error, recargar: cargar };
}