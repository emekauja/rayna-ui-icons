# Contributing

The icon source of truth lives in [`core/assets`](./assets). Generated catalog and framework exports are derived from those SVG files.

## Workflow

1. Add or update matching SVG files in both `assets/linear` and `assets/bold`.
2. Run `pnpm generate` from the repository root.
3. Verify homepage search, icon snippets, and generated exports.
4. Add a changeset when public package behavior changes.

## Naming Rules

- Every icon must exist in both variants.
- Public component names are normalized to PascalCase.
- Raw filenames remain searchable aliases in homepage metadata.
- Avoid introducing duplicate canonical names after normalization.

## Generated Outputs

- `core/src/catalog.generated.ts`
- `react/src/generated.tsx`
- `react-native/src/generated.tsx`
- `vue/src/generated.ts`

## Architecture

See [`CONTRIBUTING.mmd`](./CONTRIBUTING.mmd) for the generator flow.
