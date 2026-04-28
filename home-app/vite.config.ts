import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

function fixFederationCss(): Plugin {
  return {
    name: "fix-federation-css",
    apply: "build",
    closeBundle() {
      const assetsDir = path.resolve(__dirname, "dist/assets");
      const remoteEntryPath = path.join(assetsDir, "remoteEntry.js");

      if (!fs.existsSync(remoteEntryPath) || !fs.existsSync(assetsDir)) {
        return;
      }

      const cssAssets = fs
        .readdirSync(assetsDir)
        .filter((file) => file.endsWith(".css"))
        .map((file) => `./${file}`);

      const remoteEntry = fs.readFileSync(remoteEntryPath, "utf8");
      const patchedRemoteEntry = remoteEntry.replace(
        /a\(`__v__css__[^`]+`,/g,
        `a(${JSON.stringify(cssAssets)},`
      );

      if (patchedRemoteEntry !== remoteEntry) {
        fs.writeFileSync(remoteEntryPath, patchedRemoteEntry);
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "homeApp",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx",
      },
      shared: ["react", "react-dom"],
    }),
    fixFederationCss(),
  ],
  server: {
    port: 5173,
    strictPort: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  preview: {
    port: 5173,
    strictPort: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  build: {
    target: "esnext",
  },
});
