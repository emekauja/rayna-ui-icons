import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "../..");
const ASSET_DIR = path.resolve(ROOT_DIR, "core/assets");
const OUTPUTS = {
  catalog: path.resolve(ROOT_DIR, "core/src/catalog.generated.ts"),
  react: path.resolve(ROOT_DIR, "react/src/generated.tsx"),
  reactNative: path.resolve(ROOT_DIR, "react-native/src/generated.tsx"),
  vue: path.resolve(ROOT_DIR, "vue/src/generated.ts"),
};
const VARIANTS = ["linear", "bold"];
const VARIANT_FILE_OVERRIDES = [
  {
    canonicalName: "align-right",
    aliases: ["align-left-1"],
    variants: {
      linear: "align-left-1.svg",
      bold: "align-right.svg",
    },
  },
];

const leadingDigitWords = {
  "0": "Zero",
  "1": "One",
  "2": "Two",
  "3": "Three",
  "4": "Four",
  "5": "Five",
  "6": "Six",
  "7": "Seven",
  "8": "Eight",
  "9": "Nine",
};

function tokenize(rawName) {
  return rawName
    .replace(/\.svg$/i, "")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .split("-")
    .flatMap((chunk) => chunk.match(/[a-zA-Z]+|\d+/g) ?? [])
    .filter(Boolean)
    .map((chunk) => chunk.toLowerCase());
}

function toPascalCase(rawName) {
  const tokens = tokenize(rawName);
  return tokens
    .map((token, index) => {
      if (index === 0 && /^\d/.test(token)) {
        return token
          .split("")
          .map((char, pieceIndex) =>
            /\d/.test(char)
              ? leadingDigitWords[char]
              : pieceIndex === 0
                ? char.toUpperCase()
                : char
          )
          .join("");
      }

      return token.charAt(0).toUpperCase() + token.slice(1);
    })
    .join("");
}

function toKebabCase(rawName) {
  return tokenize(rawName).join("-");
}

function escapeTemplate(value) {
  return value.replaceAll("\\", "\\\\").replaceAll("`", "\\`").replaceAll("${", "\\${");
}

function normalizeBody(content) {
  const viewBox = content.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 24 24";
  const inner = content
    .replace(/^<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replaceAll(/fill="black"/g, 'fill="__ICON_COLOR__"')
    .replaceAll(/stroke="black"/g, 'stroke="__ICON_COLOR__"')
    .replaceAll(/fill="#000"/gi, 'fill="__ICON_COLOR__"')
    .replaceAll(/stroke="#000"/gi, 'stroke="__ICON_COLOR__"')
    .replaceAll(/id="([^"]+)"/g, 'id="__IDPREFIX__$1"')
    .replaceAll(/url\(#([^"]+)\)/g, "url(#__IDPREFIX__$1)")
    .replaceAll(/href="#([^"]+)"/g, 'href="#__IDPREFIX__$1"')
    .trim();

  return { body: inner, viewBox };
}

function createAliases(rawName, kebabName, pascalName) {
  const compact = rawName.replace(/\.svg$/i, "");
  const spaceName = kebabName.replaceAll("-", " ");
  return Array.from(
    new Set([compact, compact.toLowerCase(), kebabName, spaceName, pascalName.toLowerCase()])
  );
}

function getCanonicalEntries(variantMaps) {
  const consumed = {
    linear: new Set(),
    bold: new Set(),
  };
  const entries = [];

  for (const override of VARIANT_FILE_OVERRIDES) {
    entries.push(override);
    consumed.linear.add(override.variants.linear);
    consumed.bold.add(override.variants.bold);
  }

  const sharedNames = [...variantMaps.linear.keys()]
    .filter((name) => variantMaps.bold.has(name) && !consumed.linear.has(name))
    .sort((a, b) => a.localeCompare(b));

  for (const filename of sharedNames) {
    entries.push({
      canonicalName: filename.replace(/\.svg$/i, ""),
      aliases: [],
      variants: {
        linear: filename,
        bold: filename,
      },
    });
    consumed.linear.add(filename);
    consumed.bold.add(filename);
  }

  const leftovers = {
    linear: [...variantMaps.linear.keys()].filter((name) => !consumed.linear.has(name)),
    bold: [...variantMaps.bold.keys()].filter((name) => !consumed.bold.has(name)),
  };

  if (leftovers.linear.length || leftovers.bold.length) {
    throw new Error(
      `Unmatched assets remain. linear=${leftovers.linear.join(", ")} bold=${leftovers.bold.join(", ")}`
    );
  }

  return entries.sort((a, b) => a.canonicalName.localeCompare(b.canonicalName));
}

async function readVariantMap(variant) {
  const dir = path.resolve(ASSET_DIR, variant);
  const filenames = await fs.readdir(dir);
  const entries = await Promise.all(
    filenames
      .filter((name) => name.endsWith(".svg"))
      .map(async (filename) => {
        const content = await fs.readFile(path.resolve(dir, filename), "utf8");
        return [filename, normalizeBody(content)];
      })
  );

  return new Map(entries);
}

function buildCatalog(variantMaps) {
  const sourceEntries = getCanonicalEntries(variantMaps);
  const catalog = [];
  const seen = new Set();

  for (const sourceEntry of sourceEntries) {
    const canonicalSourceName = sourceEntry.canonicalName;
    const pascalName = toPascalCase(canonicalSourceName);
    if (seen.has(pascalName)) {
      throw new Error(`Duplicate normalized name: ${pascalName}`);
    }
    seen.add(pascalName);

    const kebabName = toKebabCase(canonicalSourceName);
    const aliases = Array.from(
      new Set([
        ...createAliases(canonicalSourceName, kebabName, pascalName),
        ...sourceEntry.aliases.flatMap((alias) =>
          createAliases(alias, toKebabCase(alias), pascalName)
        ),
      ])
    );
    const searchText = Array.from(new Set([pascalName, kebabName, ...aliases]))
      .join(" ")
      .toLowerCase();

    catalog.push({
      name: pascalName,
      pascalName,
      sourceName: canonicalSourceName.replace(/\.svg$/i, ""),
      kebabName,
      aliases,
      searchText,
      variants: {
        linear: variantMaps.linear.get(sourceEntry.variants.linear),
        bold: variantMaps.bold.get(sourceEntry.variants.bold),
      },
    });
  }

  return catalog;
}

function renderCatalogFile(catalog) {
  const entries = catalog
    .map((icon) => {
      const aliases = icon.aliases.map((alias) => `      ${JSON.stringify(alias)}`).join(",\n");
      return `  {
    name: ${JSON.stringify(icon.name)},
    pascalName: ${JSON.stringify(icon.pascalName)},
    sourceName: ${JSON.stringify(icon.sourceName)},
    kebabName: ${JSON.stringify(icon.kebabName)},
    aliases: [
${aliases}
    ],
    searchText: ${JSON.stringify(icon.searchText)},
    variants: {
      linear: {
        viewBox: ${JSON.stringify(icon.variants.linear.viewBox)},
        body: \`${escapeTemplate(icon.variants.linear.body)}\`,
      },
      bold: {
        viewBox: ${JSON.stringify(icon.variants.bold.viewBox)},
        body: \`${escapeTemplate(icon.variants.bold.body)}\`,
      },
    },
  }`;
    })
    .join(",\n");

  return `/* eslint-disable */
import type { IconCatalogEntry } from "./types";

export const iconCatalog: readonly IconCatalogEntry[] = [
${entries}
] as const;

export type IconName = IconCatalogEntry["name"];

export const iconMap: Record<string, IconCatalogEntry> = Object.fromEntries(
  iconCatalog.map((entry) => [entry.name, entry])
);

export const iconNameList: IconName[] = iconCatalog.map((entry) => entry.name);
`;
}

function renderGeneratedModule(catalog, kind) {
  const importLine =
    kind === "vue"
      ? 'import { createIcon } from "./createIcon";'
      : 'import { createIcon } from "./createIcon";';
  const header =
    kind === "vue"
      ? `/* eslint-disable */
${importLine}
import { iconMap } from "../../core/src";
`
      : `/* eslint-disable */
${importLine}
import { iconMap } from "../../core/src";
`;

  const body = catalog
    .map((icon) => `export const ${icon.pascalName} = createIcon(iconMap.${icon.pascalName});`)
    .join("\n");

  return `${header}
${body}
`;
}

async function main() {
  const linear = await readVariantMap("linear");
  const bold = await readVariantMap("bold");
  const catalog = buildCatalog({ linear, bold });

  await fs.writeFile(OUTPUTS.catalog, renderCatalogFile(catalog));
  await fs.writeFile(OUTPUTS.react, renderGeneratedModule(catalog, "react"));
  await fs.writeFile(
    OUTPUTS.reactNative,
    renderGeneratedModule(catalog, "react-native")
  );
  await fs.writeFile(OUTPUTS.vue, renderGeneratedModule(catalog, "vue"));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
