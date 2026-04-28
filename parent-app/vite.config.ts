import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "parentApp",
      remotes: {
        homeApp: "http://localhost:5173/assets/remoteEntry.js",
        productApp: "http://localhost:5174/assets/remoteEntry.js",
        cartApp: "http://localhost:5175/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 5172,
    strictPort: true,
  },
  preview: { port: 5172, strictPort: true },
  build: {
    target: "esnext",
  },
});
