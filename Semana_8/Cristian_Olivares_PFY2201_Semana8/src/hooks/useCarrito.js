/* =========================================================================
   useCarrito — Custom Hook para gestionar el carrito de compras
   Semana 8 — Desarrollo Frontend I (PFY2201)
   -------------------------------------------------------------------------
   Encapsula:
     1. El estado del carrito con persistencia en localStorage.
     2. Operaciones: addToCart, removeFromCart, clearCart.
     3. Cálculos memoizados: totalItems, totalPrice, idsEnCarrito.

   Persistencia:
     • Al montar, lee el carrito guardado en localStorage (si existe).
     • Cada vez que el carrito cambia, lo guarda en localStorage.

   Devuelve:
     • cart           (Array)    - Productos en el carrito con cantidades.
     • addToCart      (Function) - Agrega un producto (o incrementa cantidad).
     • removeFromCart (Function) - Elimina un producto por ID.
     • clearCart      (Function) - Vacía todo el carrito.
     • totalItems     (Number)   - Suma total de unidades.
     • totalPrice     (Number)   - Precio total (precioOferta × cantidad).
     • idsEnCarrito   (Set)      - Set de IDs para consultas O(1).
   ========================================================================= */

import { useState, useMemo, useEffect } from "react";

const STORAGE_KEY = "mcg-carrito";

export function useCarrito() {
  // Estado inicial: leer de localStorage si existe, o array vacío
  const [cart, setCart] = useState(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      // Si el JSON guardado está corrupto, empezamos limpio
      return [];
    }
  });

  // Persistencia: guardar en localStorage cada vez que el carrito cambia
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.warn("⚠️ No se pudo guardar el carrito en localStorage:", err);
    }
  }, [cart]);

  // ========== OPERACIONES ==========
  const addToCart = (producto) => {
    setCart((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        // Ya está en el carrito → incrementamos cantidad
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      // Nuevo producto → lo agregamos con cantidad 1
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const clearCart = () => setCart([]);

  // ========== DERIVADOS MEMOIZADOS ==========
  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.cantidad, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((acc, item) => acc + item.precioOferta * item.cantidad, 0),
    [cart]
  );

  const idsEnCarrito = useMemo(
    () => new Set(cart.map((item) => item.id)),
    [cart]
  );

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    idsEnCarrito,
  };
}