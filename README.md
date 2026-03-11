# Rayna UI Icons

`rayna-ui-icons` is a TypeScript icon library for React, React Native, and Vue, built from the Rayna UI icon set.

## Install

```bash
pnpm add rayna-ui-icons
```

Framework peer dependencies:

- React: `react`
- React Native: `react-native`, `react-native-svg`
- Vue: `vue`

## Usage

### React

```tsx
import { Search } from "rayna-ui-icons/react";

export function Demo() {
  return <Search size={24} color="#ff6b35" variant="bold" />;
}
```

### React Native

```tsx
import { Search } from "rayna-ui-icons/react-native";

export function Demo() {
  return <Search size={24} color="#ff6b35" variant="linear" />;
}
```

### Vue

```vue
<script setup lang="ts">
import { Search } from "rayna-ui-icons/vue";
</script>

<template>
  <Search :size="24" color="#ff6b35" variant="bold" />
</template>
```

## Icon Props

All framework adapters expose the same core API:

- `variant`: `"linear" | "bold"` and defaults to `"linear"`
- `size`: number or string, defaults to `24`
- `color`: icon color, defaults to `currentColor`
- `mirrored`: flips the icon horizontally

Platform-specific SVG props are also passed through.

## Package Entry Points

- `rayna-ui-icons/react`
- `rayna-ui-icons/react-native`
- `rayna-ui-icons/vue`

## Development

```bash
corepack pnpm install
corepack pnpm build
corepack pnpm test
corepack pnpm lint
```

If your shell does not load Node automatically, initialize `nvm` first:

```zsh
source ~/.nvm/nvm.sh
nvm use 20.19.5
```

## License

MIT
