import "./App.css";
import { useState } from "react";
import { useStore } from "zustand";
import { cartStore, type Product } from "../../../shared/cartStore";
import { products } from "../../../shared/products";

function App() {
  const items = useStore(cartStore, (state) => state.items);
  const incrementItem = useStore(cartStore, (state) => state.incrementItem);
  const decrementItem = useStore(cartStore, (state) => state.decrementItem);
  const [recentlyAdded, setRecentlyAdded] = useState<Record<string, boolean>>({});

  const addToCart = (product: Product) => {
    cartStore.getState().addItem(product);
    setRecentlyAdded((state) => ({ ...state, [product.name]: true }));
    setTimeout(() => {
      setRecentlyAdded((state) => ({ ...state, [product.name]: false }));
    }, 1000);

    window.dispatchEvent(
      new CustomEvent<Product>("ADD_TO_CART", {
        detail: product,
      }),
    );
  };

  return (
    <section className="product-app">
      <div className="product-header">
        <h1>Products</h1>
        <span>{products.length} available</span>
      </div>
      <div className="product-list">
        {products.map((product) => {
          const currentItem = items.find((item) => item.name === product.name);
          const currentQuantity = currentItem?.quantity ?? 0;

          return (
            <article className="product-card" key={product.name}>
              <div>
                <h2>{product.name}</h2>
                <p>Rs. {product.price}</p>
              </div>
              <div className="product-actions">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => decrementItem(product.name)}
                  disabled={!currentItem}
                >
                  -
                </button>
                <button
                  type="button"
                  className={`add-btn ${recentlyAdded[product.name] ? "added" : ""}`}
                  onClick={() => addToCart(product)}
                >
                  {recentlyAdded[product.name]
                    ? "Added to Cart"
                    : currentQuantity > 0
                      ? `Add to Cart (${currentQuantity})`
                      : "Add to Cart"}
                </button>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => incrementItem(product.name)}
                  disabled={!currentItem}
                >
                  +
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default App;
