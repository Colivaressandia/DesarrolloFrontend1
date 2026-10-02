/* =========================================================================
   ProductCard — Tarjeta individual de producto
   Semana 8 — PFY2201
   -------------------------------------------------------------------------
   Cambios respecto a Semana 7:
     • Recibe prop `enCarrito` (boolean) desde ProductList.
     • Renderizado condicional del botón con 3 estados posibles:
         - Sin stock      → botón deshabilitado "Sin stock"
         - En carrito     → botón cyan "✓ En el carrito"
         - Disponible     → botón azul "Agregar al carrito"
   ========================================================================= */

function ProductCard({ producto, onAdd, enCarrito }) {
  const descuento = Math.round(
    ((producto.precioNormal - producto.precioOferta) / producto.precioNormal) * 100
  );
  const sinStock = producto.stock === 0;

  return (
    <article className="product-card">
      <div className="img-wrapper">
        <img src={producto.imagen} alt={producto.nombre} loading="lazy" />
        {producto.badge && <span className="badge-top">{producto.badge}</span>}
        {descuento > 0 && <span className="badge-dcto">-{descuento}%</span>}
      </div>

      <div className="card-body">
        <h3 className="nombre-producto">{producto.nombre}</h3>
        <p className="descripcion">{producto.descripcion}</p>

        <div className="precios">
          <span className="precio-normal">
            ${producto.precioNormal.toLocaleString("es-CL")}
          </span>
          <span className="precio-oferta">
            ${producto.precioOferta.toLocaleString("es-CL")}
          </span>
        </div>

        {/* 🔹 Renderizado condicional del botón (3 estados) */}
        {sinStock ? (
          <button className="btn-add" disabled>
            Sin stock
          </button>
        ) : enCarrito ? (
          <button
            className="btn-add in-cart"
            onClick={() => onAdd(producto)}
            title="Agregar otra unidad"
          >
            ✓ En el carrito
          </button>
        ) : (
          <button className="btn-add" onClick={() => onAdd(producto)}>
            Agregar al carrito
          </button>
        )}
      </div>
    </article>
  );
}

export default ProductCard;