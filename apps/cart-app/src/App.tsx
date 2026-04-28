import { useEffect, useMemo } from "react";
import { useStore } from "zustand";
import "./App.css";
import { cartStore } from "../../../shared/cartStore";

const App = () => {
  const items = useStore(cartStore, (state) => state.items);

  useEffect(() => {
    const handleAddToCart = () => {
      console.log("ADD_TO_CART event received");
    };

    window.addEventListener("ADD_TO_CART", handleAddToCart);

    return () => {
      window.removeEventListener("ADD_TO_CART", handleAddToCart);
    };
  }, []);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items],
  );

  return (
    <section className="cart-app">
      <h1>Cart App</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item, index) => (
              <li key={`${item.name}-${index}`}>
                <span>{item.name}</span>
                <strong>Rs. {item.price}</strong>
              </li>
            ))}
          </ul>
          <p className="cart-total">Total: Rs. {total}</p>
        </>
      )}
    </section>
  );
};

export default App;
