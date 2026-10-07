/* =========================================================================
   useProductos — Carga y gestión del catálogo de productos.
   ========================================================================= */

import { useState, useEffect, useCallback, useRef } from "react";

const BASE_URL = import.meta.env.BASE_URL;

function obtenerRutaPublica(ruta) {
  return `${BASE_URL}${ruta.replace(/^\/+/, "")}`;
}

export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const solicitudActual = useRef(null);

  const cargar = useCallback(async () => {
    solicitudActual.current?.abort();
    const controller = new AbortController();
    solicitudActual.current = controller;

    try {
      setCargando(true);
      setError(null);

      const respuesta = await fetch(obtenerRutaPublica("data/productos.json"), {
        signal: controller.signal,
      });

      if (!respuesta.ok) {
        throw new Error(`HTTP ${respuesta.status}: ${respuesta.statusText}`);
      }

      const data = await respuesta.json();
      const productosConRuta = data.map((producto) => ({
        ...producto,
        imagen: obtenerRutaPublica(producto.imagen),
      }));

      setProductos(productosConRuta);
    } catch (err) {
      if (err.name === "AbortError") return;
      console.error("Error al cargar productos:", err);
      setError(err.message);
    } finally {
      if (!controller.signal.aborted) {
        setCargando(false);
        solicitudActual.current = null;
      }
    }
  }, []);

  useEffect(() => {
    cargar();
    return () => solicitudActual.current?.abort();
  }, [cargar]);

  const agregarProducto = useCallback((producto) => {
    const nuevoProducto = {
      ...producto,
      id: globalThis.crypto.randomUUID(),
      imagen: obtenerRutaPublica(producto.imagen),
    };

    setProductos((actuales) => [nuevoProducto, ...actuales]);
    return nuevoProducto;
  }, []);

  const eliminarProducto = useCallback((id) => {
    setProductos((actuales) =>
      actuales.filter((producto) => producto.id !== id)
    );
  }, []);

  return {
    productos,
    cargando,
    error,
    recargar: cargar,
    agregarProducto,
    eliminarProducto,
  };
}
