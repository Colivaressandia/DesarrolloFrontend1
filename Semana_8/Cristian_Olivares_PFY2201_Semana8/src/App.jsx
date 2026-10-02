/* =========================================================================
   App.jsx — Componente raíz del eCommerce
   Semana 8 — Desarrollo Frontend I (PFY2201)
   -------------------------------------------------------------------------
   Funcionalidades clave:
     1. useState para productos, carrito, búsqueda y categoría.
     2. useEffect para cargar los productos desde JSON con Fetch API.
     3. Estados de carga (cargando) y error (error) → renderizado condicional.
     4. Carrito con agregar/eliminar/vaciar y acumulación de cantidades.
     5. Filtro por categoría + búsqueda combinados con useMemo.
   ========================================================================= */

import { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar";
import Carrusel from "./components/Carrusel";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Beneficios from "./components/Beneficios";
import Formulario from "./components/Formulario";
import Footer from "./components/Footer";
import "./styles.css";

function App() {
  // ========== ESTADOS PRINCIPALES ==========
  const [productos, setProductos] = useState([]);   // Catálogo (se llena con fetch)
  const [cargando, setCargando] = useState(true);   // Mientras carga el fetch
  const [error, setError] = useState(null);         // Error de la carga

  const [cart, setCart] = useState([]);             // Carrito
  const [busqueda, setBusqueda] = useState("");     // Término de búsqueda
  const [categoria, setCategoria] = useState("todas");

  // ========== EFECTO: CARGAR PRODUCTOS AL MONTAR ==========
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setCargando(true);
        setError(null);

        // Simulamos un pequeño retraso de red para evidenciar el estado "Cargando..."
        await new Promise((resolve) => setTimeout(resolve, 800));

        // BASE_URL permite que funcione en local Y en GitHub Pages (subcarpeta)
        const url = `${import.meta.env.BASE_URL}data/productos.json`;
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
          throw new Error(`Error HTTP ${respuesta.status}: ${respuesta.statusText}`);
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
    };

    cargarProductos();
  }, []); // [] = solo se ejecuta una vez al montar

  // ========== CARRITO ==========
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

  // ========== DERIVADOS (useMemo para rendimiento) ==========
  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.cantidad, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((acc, item) => acc + item.precioOferta * item.cantidad, 0),
    [cart]
  );

  // Set de IDs en el carrito → para consultar rápido si un producto ya está agregado
  const idsEnCarrito = useMemo(
    () => new Set(cart.map((item) => item.id)),
    [cart]
  );

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
          {/* 🔹 Renderizado condicional: cargando / error / catálogo */}
          {cargando && (
            <p className="estado-carga">⏳ Cargando productos...</p>
          )}

          {error && !cargando && (
            <div className="estado-error">
              <p>⚠️ No pudimos cargar los productos.</p>
              <small>{error}</small>
            </div>
          )}

          {!cargando && !error && (
            <ProductList
              productos={productosFiltrados}
              onAdd={addToCart}
              idsEnCarrito={idsEnCarrito}
            />
          )}

          <div id="carrito">
            <Cart
              items={cart}
              totalItems={totalItems}
              totalPrice={totalPrice}
              onRemove={removeFromCart}
              onClear={clearCart}
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