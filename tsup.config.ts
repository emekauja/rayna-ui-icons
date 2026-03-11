import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "react/index": "react/src/index.ts",
    "react-native/index": "react-native/src/index.ts",
    "vue/index": "vue/src/index.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    "react",
    "react/jsx-runtime",
    "react-dom",
    "react-native",
    "react-native-svg",
    "vue",
  ],
});
