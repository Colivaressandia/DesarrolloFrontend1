import ProductCard from "./ProductCard";

/* =========================================================================
   ProductList — Lista de tarjetas de productos
   Semana 8 — PFY2201
   -------------------------------------------------------------------------
   Recibe el Set de IDs que están en el carrito (idsEnCarrito) para pasarlo
   a cada card y que muestre el botón "En el carrito" cuando corresponda.
   ========================================================================= */

function ProductList({ productos, onAdd, idsEnCarrito }) {
  // 🔹 Renderizado condicional: sin resultados de búsqueda
  if (productos.length === 0) {
    return (
      <p className="empty-state">
        🔍 No encontramos productos con ese criterio.
      </p>
    );
  }

  return (
    <section className="product-list">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          onAdd={onAdd}
          enCarrito={idsEnCarrito.has(producto.id)}
        />
      ))}
    </section>
  );
}

export default ProductList;