import React, { Suspense } from "react";

// @ts-ignore
const Home = React.lazy(() => import("homeApp/App"));
// @ts-ignore
const Product = React.lazy(() => import("productApp/App"));
// @ts-ignore
const Cart = React.lazy(() => import("cartApp/App"));

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Parent App</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <div>
          <Home />
          <Product />
          <Cart />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
