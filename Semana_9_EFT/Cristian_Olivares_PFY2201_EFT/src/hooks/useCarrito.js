/* =========================================================================
   useCarrito — Estado, operaciones y persistencia del carrito.
   ========================================================================= */

import { useState, useMemo, useEffect } from "react";

const STORAGE_KEY = "mcg-eft-carrito";

function leerCarritoGuardado() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY);
    if (!guardado) return { cart: [], storageError: null };

    const cart = JSON.parse(guardado);
    const carritoValido =
      Array.isArray(cart) &&
      cart.every(
        (item) =>
          item &&
          (typeof item.id === "string" || typeof item.id === "number") &&
          Number.isInteger(item.cantidad) &&
          item.cantidad > 0 &&
          Number.isFinite(item.precioOferta)
      );

    if (!carritoValido) {
      throw new Error("Los datos guardados no tienen un formato válido.");
    }

    return { cart, storageError: null };
  } catch (error) {
    console.error("No se pudo recuperar el carrito de localStorage:", error);
    return {
      cart: [],
      storageError: "No pudimos recuperar el carrito guardado en este navegador.",
    };
  }
}

export function useCarrito() {
  const [estadoCarrito, setEstadoCarrito] = useState(leerCarritoGuardado);
  const { cart, storageError } = estadoCarrito;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      setEstadoCarrito((actual) =>
        actual.storageError ? { ...actual, storageError: null } : actual
      );
    } catch (error) {
      console.error("No se pudo guardar el carrito en localStorage:", error);
      setEstadoCarrito((actual) => ({
        ...actual,
        storageError: "No pudimos guardar el carrito en este navegador.",
      }));
    }
  }, [cart]);

  const addToCart = (producto) => {
    setEstadoCarrito((actual) => {
      const existe = actual.cart.find((item) => item.id === producto.id);

      return {
        ...actual,
        cart: existe
          ? actual.cart.map((item) =>
              item.id === producto.id
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            )
          : [...actual.cart, { ...producto, cantidad: 1 }],
      };
    });
  };

  const removeFromCart = (id) =>
    setEstadoCarrito((actual) => ({
      ...actual,
      cart: actual.cart.filter((item) => item.id !== id),
    }));

  const clearCart = () =>
    setEstadoCarrito((actual) => ({ ...actual, cart: [] }));

  const totalItems = useMemo(
    () => cart.reduce((acumulado, item) => acumulado + item.cantidad, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (acumulado, item) => acumulado + item.precioOferta * item.cantidad,
        0
      ),
    [cart]
  );

  const idsEnCarrito = useMemo(
    () => new Set(cart.map((item) => item.id)),
    [cart]
  );

  return {
    cart,
    storageError,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    idsEnCarrito,
  };
}
