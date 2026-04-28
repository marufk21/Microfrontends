import React, { Suspense } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";

const Home = React.lazy(() => import("homeApp/App"));
const Product = React.lazy(() => import("productApp/App"));
const Cart = React.lazy(() => import("cartApp/App"));

function App() {
  return (
    <div className="shell">
      <header className="shell-header">
        <div>
          <p className="shell-kicker">Microfrontends Demo</p>
          <h1>Minimal Commerce Suite</h1>
        </div>
      </header>

      <nav className="shell-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `shell-link ${isActive ? "active" : ""}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => `shell-link ${isActive ? "active" : ""}`}
        >
          Products
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => `shell-link ${isActive ? "active" : ""}`}
        >
          Cart
        </NavLink>
      </nav>

      <Suspense fallback={<p className="shell-loading">Loading remote app...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<p className="shell-loading">Page not found</p>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
