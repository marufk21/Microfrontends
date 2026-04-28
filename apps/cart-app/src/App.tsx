import { useMemo } from "react";
import { useStore } from "zustand";
import "./App.css";
import { cartStore } from "../../../shared/cartStore";

const App = () => {
  const items = useStore(cartStore, (state) => state.items);
  const incrementItem = useStore(cartStore, (state) => state.incrementItem);
  const decrementItem = useStore(cartStore, (state) => state.decrementItem);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  return (
    <section className="cart-app">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <span>{totalItems} items</span>
      </div>
      {items.length === 0 ? (
        <p className="cart-empty">Your cart is empty. Add products to begin.</p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.name}>
                <div>
                  <span>{item.name}</span>
                  <p>Rs. {(item.price * item.quantity).toLocaleString()}</p>
                </div>
                <div className="qty-controls">
                  <button type="button" onClick={() => decrementItem(item.name)}>
                    -
                  </button>
                  <strong>{item.quantity}</strong>
                  <button type="button" onClick={() => incrementItem(item.name)}>
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="cart-total">Total: Rs. {total.toLocaleString()}</p>
        </>
      )}
    </section>
  );
};

export default App;
