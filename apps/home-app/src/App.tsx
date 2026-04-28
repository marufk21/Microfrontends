import "./App.css";
import { products } from "../../../shared/products";

const App = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <section className="home-card">
      <p className="section-kicker">Discover</p>
      <h1>Modern Workspace Essentials</h1>
      <p className="section-subtitle">
        Curated picks from our catalog to upgrade your everyday setup.
      </p>

      <div className="home-title-row">
        <h2>Featured Products</h2>
        <span>{featuredProducts.length} items</span>
      </div>

      <div className="home-product-grid">
        {featuredProducts.map((product) => (
          <article key={product.name} className="home-product-card">
            <strong>{product.name}</strong>
            <p>Rs. {product.price}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
export default App;
