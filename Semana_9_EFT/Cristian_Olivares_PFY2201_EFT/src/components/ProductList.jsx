/* =========================================================================
   ProductList — Lista de tarjetas de productos
   Evaluación Final Transversal — Desarrollo Frontend I (PFY2201)
   -------------------------------------------------------------------------
   Props:
     • productos    (Array)  - Lista de productos filtrados a mostrar
     • onAdd        (Function) - Callback al hacer click en "Agregar al carrito"
     • idsEnCarrito (Set)    - Set de IDs de productos ya en el carrito

   Renderizado condicional:
     • Si la lista está vacía (sin coincidencias) → mensaje informativo.
   ========================================================================= */

import ProductCard from "./ProductCard";

function ProductList({
  productos,
  onAdd,
  idsEnCarrito,
  onRemoveProduct,
  gestionandoCatalogo,
}) {
  // 🔹 Renderizado condicional: sin resultados de búsqueda
  if (productos.length === 0) {
    return (
      <p className="empty-state col-12" role="status">
        🔍 No encontramos productos con ese criterio.
      </p>
    );
  }

  return (
    <section className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 product-list" aria-label="Productos disponibles">
      {productos.map((producto) => (
        <div className="col" key={producto.id}>
          <ProductCard
            producto={producto}
            onAdd={onAdd}
            enCarrito={idsEnCarrito.has(producto.id)}
            onRemoveProduct={onRemoveProduct}
            gestionandoCatalogo={gestionandoCatalogo}
          />
        </div>
      ))}
    </section>
  );
}

export default ProductList;