import React, { Suspense } from "react";
import { NavLink, Route, Routes } from "react-router-dom";

const Home = React.lazy(() => import("homeApp/App"));
const Product = React.lazy(() => import("productApp/App"));
const Cart = React.lazy(() => import("cartApp/App"));

function ProductCartPage() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
        gap: 16,
        alignItems: "start",
      }}
    >
      <Product />
      <Cart />
    </div>
  );
}

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <nav
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 16,
          padding: 12,
          border: "1px solid #e5e7eb",
          borderRadius: 10,
        }}
      >
        <NavLink
          to="/"
          end
          style={({ isActive }) => ({
            fontWeight: isActive ? 700 : 400,
            textDecoration: "none",
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          style={({ isActive }) => ({
            fontWeight: isActive ? 700 : 400,
            textDecoration: "none",
          })}
        >
          Products
        </NavLink>
        <NavLink
          to="/cart"
          style={({ isActive }) => ({
            fontWeight: isActive ? 700 : 400,
            textDecoration: "none",
          })}
        >
          Cart
        </NavLink>
    
      </nav>

      <Suspense fallback={<p>Loading remote app...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductCartPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
