import React, { Suspense } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";

// @ts-ignore
const Home = React.lazy(() => import("homeApp/App"));
// @ts-ignore
const Product = React.lazy(() => import("productApp/App"));
// @ts-ignore
const Cart = React.lazy(() => import("cartApp/App"));

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

      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
