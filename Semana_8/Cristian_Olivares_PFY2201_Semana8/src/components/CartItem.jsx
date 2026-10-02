/* =========================================================================
   CartItem — Fila individual de un producto dentro del carrito
   Semana 8 — Desarrollo Frontend I (PFY2201)
   -------------------------------------------------------------------------
   Props:
     • item     (Object)   - Producto del carrito (con cantidad)
     • onRemove (Function) - Callback que recibe el ID a eliminar

   Muestra:
     • Nombre del producto
     • Cantidad × precio unitario
     • Botón ✕ para eliminar el producto del carrito
   ========================================================================= */

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