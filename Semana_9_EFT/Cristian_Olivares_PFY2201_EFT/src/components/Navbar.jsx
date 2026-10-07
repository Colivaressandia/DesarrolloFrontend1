/* =========================================================================
   Navbar.jsx — Barra de navegación superior
   Evaluación Final Transversal — Desarrollo Frontend I (PFY2201)
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
  categorias,
  onCategoriaChange,
}) {
  return (
    <nav className="navbar navbar-expand-xl navbar-dark store-navbar">
      <div className="container-fluid">
        <a href="#inicio" className="navbar-brand">🎮 MCG</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#store-navigation"
          aria-controls="store-navigation"
          aria-expanded="false"
          aria-label="Mostrar navegación"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="store-navigation">
          <div className="navbar-nav navbar-links me-xl-auto">
            <a className="nav-link" href="#inicio">Inicio</a>
            <a className="nav-link" href="#novedades">Novedades</a>
            <a className="nav-link" href="#productos">Catálogo</a>
            <a className="nav-link" href="#servicios">Servicios</a>
            <a className="nav-link" href="#contacto">Contacto</a>
          </div>

          <div className="navbar-tools">
            <select
              className="form-select form-select-sm select-categoria"
              value={categoria}
              onChange={(event) => onCategoriaChange(event.target.value)}
              aria-label="Filtrar por categoría"
            >
              <option value="todas">Todas las categorías</option>
              {categorias.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <input
              type="search"
              className="form-control form-control-sm input-busqueda"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(event) => onBusquedaChange(event.target.value)}
              aria-label="Buscar producto"
            />
            <a href="#carrito" className="cart-badge" aria-label={`${totalItems} productos en el carrito`}>
              🛒 <span>{totalItems}</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;