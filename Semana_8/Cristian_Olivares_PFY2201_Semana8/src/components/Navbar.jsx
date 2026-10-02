/* =========================================================================
   Navbar.jsx — Barra de navegación superior
   Semana 7 — Desarrollo Frontend I (PFY2201)
   -------------------------------------------------------------------------
   Incluye:
     • Enlaces de ancla (Inicio, Novedades, Catálogo, Servicios, Contacto)
     • Selector de categoría (controla el filtro del catálogo)
     • Buscador controlado (input controlado con onChange)
     • Contador del carrito
   ========================================================================= */

function Navbar({
  totalItems,
  busqueda,
  onBusquedaChange,
  categoria,
  onCategoriaChange,
}) {
  const categorias = ["todas", "Consolas", "Accesorios", "Audio"];

  return (
    <header className="navbar">
      <a href="#inicio" className="navbar-brand">🎮 MCG</a>

      <nav className="navbar-links">
        <a href="#inicio">Inicio</a>
        <a href="#novedades">Novedades</a>
        <a href="#productos">Catálogo</a>
        <a href="#servicios">Servicios</a>
        <a href="#contacto">Contacto</a>
      </nav>

      <select
        className="select-categoria"
        value={categoria}
        onChange={(e) => onCategoriaChange(e.target.value)}
        aria-label="Filtrar por categoría"
      >
        {categorias.map((cat) => (
          <option key={cat} value={cat}>
            {cat === "todas" ? "🎮 Categorías" : cat}
          </option>
        ))}
      </select>

      <input
        type="search"
        className="input-busqueda"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => onBusquedaChange(e.target.value)}
        aria-label="Buscar producto"
      />

      <a href="#carrito" className="cart-badge" aria-label={`${totalItems} productos en el carrito`}>
        🛒 <span>{totalItems}</span>
      </a>
    </header>
  );
}

export default Navbar;