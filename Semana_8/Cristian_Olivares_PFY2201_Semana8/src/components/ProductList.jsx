/* =========================================================================
   ProductList — Lista de tarjetas de productos
   Semana 8 — Desarrollo Frontend I (PFY2201)
   -------------------------------------------------------------------------
   Props:
     • productos    (Array)  - Lista de productos filtrados a mostrar
     • onAdd        (Function) - Callback al hacer click en "Agregar al carrito"
     • idsEnCarrito (Set)    - Set de IDs de productos ya en el carrito

   Renderizado condicional:
     • Si la lista está vacía (sin coincidencias) → mensaje informativo.
   ========================================================================= */

import ProductCard from "./ProductCard";

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