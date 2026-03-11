import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@emekauja/raynaui-icons/react": path.resolve(
        __dirname,
        "../react/src/index.ts"
      ),
      "@emekauja/raynaui-icons": path.resolve(__dirname, "../src/index.ts"),
      "@raynaui/icons-core": path.resolve(__dirname, "../core/src/index.ts"),
      "@raynaui/icons-theme": path.resolve(__dirname, "../theme/src/index.ts"),
    },
  },
});
