/* =========================================================================
   App.jsx — Componente raíz del eCommerce
   Semana 8 — Desarrollo Frontend I (PFY2201)
   -------------------------------------------------------------------------
   Funcionalidades:
     1. Carga de productos con el custom hook useProductos (useEffect + fetch).
     2. Carrito gestionado por el custom hook useCarrito (useState + localStorage).
     3. Búsqueda y filtros combinados con useMemo.
     4. Renderizado condicional: cargando / error / catálogo.
     5. Botón "Reintentar" en el estado de error.
     6. Toasts (notificaciones) al agregar/eliminar productos del carrito.

   App.jsx queda como orquestador: combina hooks, maneja callbacks con
   feedback visual y compone la UI.
   ========================================================================= */

import { useState, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Carrusel from "./components/Carrusel";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Beneficios from "./components/Beneficios";
import Formulario from "./components/Formulario";
import Footer from "./components/Footer";
import { useProductos } from "./hooks/useProductos";
import { useCarrito } from "./hooks/useCarrito";
import "./styles.css";

function App() {
  // ========== HOOKS PERSONALIZADOS ==========
  const { productos, cargando, error, recargar } = useProductos();
  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    idsEnCarrito,
  } = useCarrito();

  // ========== ESTADOS LOCALES ==========
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("todas");

  // ========== CALLBACKS CON FEEDBACK VISUAL ==========
  // Envolvemos las operaciones del carrito para disparar toasts.

  const handleAddToCart = (producto) => {
    addToCart(producto);
    toast.success(`${producto.nombre} agregado al carrito`);
  };

  const handleRemoveFromCart = (id) => {
    const item = cart.find((i) => i.id === id);
    removeFromCart(id);
    if (item) {
      toast(`${item.nombre} eliminado del carrito`, { icon: "🗑️" });
    }
  };

  const handleClearCart = () => {
    if (cart.length === 0) return;
    clearCart();
    toast("Carrito vaciado", { icon: "🧹" });
  };

  // ========== FILTRADO CON useMemo ==========
  const productosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    return productos.filter((p) => {
      const okCat = categoria === "todas" || p.categoria === categoria;
      const okBus =
        termino === "" ||
        p.nombre.toLowerCase().includes(termino) ||
        p.categoria.toLowerCase().includes(termino);
      return okCat && okBus;
    });
  }, [productos, busqueda, categoria]);

  // ========== RENDER ==========
  return (
    <div className="app">
      {/* 🔹 Contenedor de notificaciones (toasts) */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#161b22",
            color: "#e6edf3",
            border: "1px solid #0dcaf0",
            borderRadius: "8px",
            fontSize: "0.9rem",
          },
          success: {
            iconTheme: {
              primary: "#0dcaf0",
              secondary: "#0d1117",
            },
          },
        }}
      />

      <Navbar
        totalItems={totalItems}
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
        categoria={categoria}
        onCategoriaChange={setCategoria}
      />

      <section id="novedades">
        <Carrusel />
      </section>

      <main className="container" id="productos">
        <header className="hero" id="inicio">
          <h1>🎮 Memory Card Games</h1>
          <p>Catálogo cargado dinámicamente con Fetch API y useEffect.</p>
        </header>

        <div className="layout">
          {/* 🔹 Renderizado condicional: cargando */}
          {cargando && (
            <p className="estado-carga">⏳ Cargando productos...</p>
          )}

          {/* 🔹 Renderizado condicional: error + botón Reintentar */}
          {error && !cargando && (
            <div className="estado-error">
              <p>⚠️ No pudimos cargar los productos.</p>
              <small>{error}</small>
              <button
                className="btn-reintentar"
                onClick={recargar}
                aria-label="Reintentar carga de productos"
              >
                🔄 Reintentar
              </button>
            </div>
          )}

          {/* 🔹 Renderizado condicional: catálogo */}
          {!cargando && !error && (
            <ProductList
              productos={productosFiltrados}
              onAdd={handleAddToCart}
              idsEnCarrito={idsEnCarrito}
            />
          )}

          <div id="carrito">
            <Cart
              items={cart}
              totalItems={totalItems}
              totalPrice={totalPrice}
              onRemove={handleRemoveFromCart}
              onClear={handleClearCart}
            />
          </div>
        </div>
      </main>

      <Beneficios />
      <Formulario />
      <Footer />
    </div>
  );
}

export default App;