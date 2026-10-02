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