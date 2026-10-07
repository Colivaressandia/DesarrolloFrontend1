/* =========================================================================
   Cart — Contenedor lateral del carrito de compras
   Semana 8 — Desarrollo Frontend I (PFY2201)
   -------------------------------------------------------------------------
   Props:
     • items      (Array)    - Productos en el carrito con cantidades
     • totalItems (Number)   - Suma total de unidades
     • totalPrice (Number)   - Precio total (precioOferta × cantidad)
     • onRemove   (Function) - Callback para eliminar un producto por ID
     • onClear    (Function) - Callback para vaciar todo el carrito

   Renderizado condicional:
     • Si el carrito está vacío → mensaje "Tu carrito está vacío."
     • Si tiene productos → lista + total + botón "Vaciar carrito"
   ========================================================================= */

import CartItem from "./CartItem";

function Cart({ items, totalItems, totalPrice, onRemove, onClear }) {
  return (
    <aside className="cart">
      <h2>🛒 Carrito ({totalItems})</h2>

      {/* 🔹 Renderizado condicional: carrito vacío */}
      {items.length === 0 ? (
        <p className="empty-state">Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <CartItem key={item.id} item={item} onRemove={onRemove} />
            ))}
          </ul>

          <div className="cart-total">
            <strong>Total:</strong>
            <span>${totalPrice.toLocaleString("es-CL")}</span>
          </div>

          <button className="btn-clear" onClick={onClear}>
            Vaciar carrito
          </button>
        </>
      )}
    </aside>
  );
}

export default Cart;