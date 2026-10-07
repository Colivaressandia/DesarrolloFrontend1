/* =========================================================================
   ProductCard — Tarjeta individual de producto
   Evaluación Final Transversal — Desarrollo Frontend I (PFY2201)
   -------------------------------------------------------------------------
   Props:
     • producto   (Object)   - Datos del producto (nombre, precio, imagen, etc.)
     • onAdd      (Function) - Callback al hacer click en "Agregar al carrito"
     • enCarrito  (Boolean)  - Indica si el producto ya está en el carrito

   Renderizado condicional del botón (3 estados):
     • Sin stock    → botón gris deshabilitado "Sin stock"
     • En carrito   → botón cyan "✓ En el carrito"
     • Disponible   → botón azul "Agregar al carrito"

   Cálculo automático:
     • Porcentaje de descuento entre precioNormal y precioOferta.
   ========================================================================= */

function ProductCard({ producto, onAdd, enCarrito, onRemoveProduct, gestionandoCatalogo }) {
  const descuento = Math.round(
    ((producto.precioNormal - producto.precioOferta) / producto.precioNormal) * 100
  );
  const sinStock = producto.stock === 0;

  return (
    <article className="card product-card h-100">
      <div className="img-wrapper card-img-top">
        <img src={producto.imagen} alt={producto.nombre} loading="lazy" />
        {/* 🔹 Badge condicional: solo si el producto tiene badge definido */}
        {producto.badge && <span className="badge-top">{producto.badge}</span>}
        {/* 🔹 Badge condicional: solo si hay descuento */}
        {descuento > 0 && <span className="badge-dcto">-{descuento}%</span>}
      </div>

      <div className="card-body">
        <span className="product-category">{producto.categoria}</span>
        <h3 className="nombre-producto card-title">{producto.nombre}</h3>
        <p className="descripcion">{producto.descripcion}</p>

        <div className="precios">
          {producto.precioNormal > producto.precioOferta && (
            <span className="precio-normal">
              ${producto.precioNormal.toLocaleString("es-CL")}
            </span>
          )}
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
          <button className="btn btn-info btn-add" onClick={() => onAdd(producto)}>
            Agregar al carrito
          </button>
        )}
        {gestionandoCatalogo && (
          <button
            className="btn btn-outline-danger btn-sm mt-2"
            onClick={() => onRemoveProduct(producto.id)}
            aria-label={`Eliminar ${producto.nombre} del catálogo`}
          >
            Eliminar del catálogo
          </button>
        )}
      </div>
    </article>
  );
}

export default ProductCard;