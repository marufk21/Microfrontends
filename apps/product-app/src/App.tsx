import "./App.css";
import { cartStore, type CartItem } from "../../../shared/cartStore";

const products: CartItem[] = [
  { name: "Wireless Mouse", price: 899 },
  { name: "Mechanical Keyboard", price: 2499 },
  { name: "USB-C Cable", price: 399 },
  { name: "Laptop Stand", price: 1299 },
  { name: "Desk Lamp", price: 1599 },
  { name: "Noise Cancelling Headphones", price: 4999 },
];

function App() {
  const addToCart = (product: CartItem) => {
    cartStore.getState().addItem(product);

    window.dispatchEvent(
      new CustomEvent<CartItem>("ADD_TO_CART", {
        detail: product,
      }),
    );
  };

  return (
    <section className="product-app">
      <h1>Product App</h1>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.name}>
            <div>
              <h2>{product.name}</h2>
              <p>Rs. {product.price}</p>
            </div>
            <button type="button" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
