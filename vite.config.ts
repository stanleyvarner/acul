import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      // external: ["react", "react-dom", "tailwindcss"],
      output: {
        chunkFileNames: "bundle.js",
        assetFileNames: "[name].[ext]",
        entryFileNames: "bundle.js",
        // globals: {
        //   react: "React",
        //   "react-dom": "ReactDOM",
        //   tailwindcss: "tailwindcss"
        // },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
