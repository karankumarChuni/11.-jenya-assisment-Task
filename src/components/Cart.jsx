import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/slices/cartSlice";
import { toast } from "react-toastify";
import "../styles/Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);

  const handleRemove = (id, title) => {
    dispatch(removeFromCart(id));
    toast.error(`${title} removed from cart`);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} />
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: ${item.total}</p>
                </div>
                <button onClick={() => handleRemove(item.id, item.title)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ${totalAmount}</h3>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
