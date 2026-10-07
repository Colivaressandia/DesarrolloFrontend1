/* =========================================================================
   App.jsx — Componente raíz del eCommerce
   Evaluación Final Transversal — Desarrollo Frontend I (PFY2201)
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

import { useState, useMemo, useEffect } from "react";
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

const imagenesCatalogo = [
  { archivo: "img/switch2.png", nombre: "Nintendo Switch 2" },
  { archivo: "img/ps5pro.png", nombre: "PlayStation 5 Pro" },
  { archivo: "img/xbox.png", nombre: "Xbox Series X" },
  { archivo: "img/teclado.png", nombre: "Teclado gamer" },
  { archivo: "img/mouse.png", nombre: "Mouse gamer" },
  { archivo: "img/audifonos.png", nombre: "Audífonos gamer" },
];

function App() {
  // ========== HOOKS PERSONALIZADOS ==========
  const {
    productos,
    cargando,
    error,
    recargar,
    agregarProducto,
    eliminarProducto,
  } = useProductos();
  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    idsEnCarrito,
    storageError,
  } = useCarrito();

  // ========== ESTADOS LOCALES ==========
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("todas");
  const [gestionandoCatalogo, setGestionandoCatalogo] = useState(false);
  const categorias = useMemo(
    () => [...new Set(productos.map((producto) => producto.categoria))].sort(),
    [productos]
  );

  useEffect(() => {
    if (storageError) {
      toast.error(storageError, { duration: 5000, id: "carrito-storage-error" });
    }
  }, [storageError]);

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

  const handleRemoveProduct = (id) => {
    const producto = productos.find((item) => item.id === id);
    eliminarProducto(id);
    removeFromCart(id);
    if (
      producto &&
      categoria === producto.categoria &&
      productos.filter((item) => item.categoria === categoria).length === 1
    ) {
      setCategoria("todas");
    }
    if (producto) toast(`${producto.nombre} eliminado del catálogo`, { icon: "🗑️" });
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
        categorias={categorias}
        onCategoriaChange={setCategoria}
      />

      <section id="novedades">
        <Carrusel />
      </section>

      <main className="container page-container" id="productos">
        <header className="hero" id="inicio">
          <p className="eyebrow">TECNOLOGÍA Y GAMING EN UN SOLO LUGAR</p>
          <h1>🎮 Memory Card Games</h1>
          <p>Consolas y accesorios gamer con imágenes reales del catálogo.</p>
        </header>

        <div className="row g-4 layout">
          <section className="col-lg-9" aria-label="Catálogo de consolas y accesorios">
            <div className="catalog-toolbar">
              <div>
                <h2>Consolas y accesorios</h2>
                <p>Encuentra tu próxima consola y completa tu setup gamer.</p>
              </div>
              <button
                type="button"
                className="btn btn-outline-info"
                onClick={() => setGestionandoCatalogo((actual) => !actual)}
                aria-expanded={gestionandoCatalogo}
                aria-controls="gestion-catalogo"
              >
                {gestionandoCatalogo ? "Cerrar gestión" : "Administrar catálogo"}
              </button>
            </div>

            {gestionandoCatalogo && (
              <section id="gestion-catalogo" className="catalog-manager">
                <h3>Agregar producto</h3>
                <form
                  className="row g-3"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const form = event.currentTarget;
                    const datos = new FormData(form);
                    agregarProducto({
                      nombre: datos.get("nombre").trim(),
                      categoria: datos.get("categoria"),
                      descripcion: datos.get("descripcion").trim(),
                      precioNormal: Number(datos.get("precio")),
                      precioOferta: Number(datos.get("precio")),
                      imagen: datos.get("imagen"),
                      badge: "Nuevo",
                      stock: 10,
                    });
                    form.reset();
                    toast.success("Producto agregado al catálogo");
                  }}
                >
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="nuevo-nombre">Nombre del producto</label>
                    <input className="form-control" id="nuevo-nombre" name="nombre" minLength="3" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="nuevo-categoria">Categoría</label>
                    <select className="form-select" id="nuevo-categoria" name="categoria" required defaultValue="">
                      <option value="" disabled>Selecciona una categoría</option>
                      {categorias.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="nuevo-imagen">Imagen del producto</label>
                    <select className="form-select" id="nuevo-imagen" name="imagen" required defaultValue="">
                      <option value="" disabled>Selecciona una foto del catálogo</option>
                      {imagenesCatalogo.map((imagen) => (
                        <option key={imagen.archivo} value={imagen.archivo}>{imagen.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="nuevo-precio">Precio (CLP)</label>
                    <input className="form-control" id="nuevo-precio" name="precio" type="number" min="1" step="1" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="nuevo-descripcion">Descripción</label>
                    <input className="form-control" id="nuevo-descripcion" name="descripcion" minLength="10" required />
                  </div>
                  <div className="col-12">
                    <button className="btn btn-info" type="submit">Agregar producto</button>
                  </div>
                </form>
              </section>
            )}

            {cargando && <p className="estado-carga">⏳ Cargando catálogo...</p>}

            {error && !cargando && (
              <div className="estado-error" role="alert">
                <p>⚠️ No pudimos cargar el catálogo.</p>
                <small>{error}</small>
                <button
                  className="btn btn-outline-info btn-reintentar"
                  onClick={recargar}
                  aria-label="Reintentar carga del catálogo"
                >
                  🔄 Reintentar
                </button>
              </div>
            )}

            {!cargando && !error && (
              <ProductList
                productos={productosFiltrados}
                onAdd={handleAddToCart}
                idsEnCarrito={idsEnCarrito}
                onRemoveProduct={handleRemoveProduct}
                gestionandoCatalogo={gestionandoCatalogo}
              />
            )}
          </section>

          <div id="carrito" className="col-lg-3">
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