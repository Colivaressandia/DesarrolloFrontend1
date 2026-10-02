function CartItem({ item, onRemove }) {
  return (
    <li className="cart-item">
      <div>
        <p className="item-name">{item.nombre}</p>
        <small>
          {item.cantidad} × ${item.precioOferta.toLocaleString("es-CL")}
        </small>
      </div>
      <button
        className="btn-remove"
        onClick={() => onRemove(item.id)}
        aria-label={`Eliminar ${item.nombre}`}
      >
        ✕
      </button>
    </li>
  );
}

export default CartItem;