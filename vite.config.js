import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     proxy: {
//       "/api": "https://gateway.pinata.cloud",
//     },
//   },
// });

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/pinata-api": {
        target: "https://api.pinata.cloud",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pinata-api/, ""),
      },
    },
  },
});
