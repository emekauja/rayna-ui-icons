import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: [
      "core/**/*.test.ts",
      "react/**/*.test.tsx",
      "react-native/**/*.test.tsx",
      "vue/**/*.test.ts",
      "homepage/**/*.test.tsx",
    ],
  },
  resolve: {
    alias: {
      "@emekauja/raynaui-icons-react": path.resolve(
        __dirname,
        "react/src/index.ts"
      ),
      "@emekauja/raynaui-icons-react-native": path.resolve(
        __dirname,
        "react-native/src/index.ts"
      ),
      "@emekauja/raynaui-icons-vue": path.resolve(
        __dirname,
        "vue/src/index.ts"
      ),
      "@raynaui/icons-core": path.resolve(__dirname, "core/src/index.ts"),
      "@raynaui/icons-theme": path.resolve(__dirname, "theme/src/index.ts"),
    },
  },
});
