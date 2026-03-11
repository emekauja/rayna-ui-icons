import type { ComponentType } from "react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";

import { iconCatalog, type IconCatalogEntry, type IconVariant } from "@raynaui/icons-core";
import * as Icons from "@emekauja/raynaui-icons/react";

type Framework = "react" | "react-native" | "vue";
type IconComponent = ComponentType<Record<string, unknown>>;

const frameworkInstallMap: Record<Framework, string> = {
  react: "pnpm add @emekauja/raynaui-icons react react-dom",
  "react-native": "pnpm add @emekauja/raynaui-icons react-native-svg",
  vue: "pnpm add @emekauja/raynaui-icons vue",
};

const frameworkTitleMap: Record<Framework, string> = {
  react: "React",
  "react-native": "React Native",
  vue: "Vue",
};

const featureStats = [
  { label: "Icons", value: `${iconCatalog.length}` },
  { label: "Variants", value: "2" },
  { label: "Frameworks", value: "3" },
];

const spotlightNames = ["Search", "Palette", "AiStars", "Bot"] as const;

function makeSvgMarkup(icon: IconCatalogEntry, variant: IconVariant) {
  return `<svg viewBox="${icon.variants[variant].viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">${icon.variants[variant].body.replaceAll(
    "__IDPREFIX__",
    "preview-"
  ).replaceAll("__ICON_COLOR__", "#ff6b35")}</svg>`;
}

function makeUsageSnippet(name: string, framework: Framework, variant: IconVariant) {
  if (framework === "vue") {
    return `<script setup lang="ts">\nimport { ${name} } from "@emekauja/raynaui-icons/vue";\n</script>\n\n<template>\n  <${name} :size=\"32\" color=\"#ff6b35\" variant=\"${variant}\" />\n</template>`;
  }

  const source =
    framework === "react"
      ? "@emekauja/raynaui-icons/react"
      : "@emekauja/raynaui-icons/react-native";

  return `import { ${name} } from "${source}";\n\nexport function Example() {\n  return <${name} size={32} color="#ff6b35" variant="${variant}" />;\n}`;
}

function FeatureCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <article className="feature-card">
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

export function App() {
  const [query, setQuery] = useState("");
  const [framework, setFramework] = useState<Framework>("react");
  const [variant, setVariant] = useState<IconVariant>("linear");
  const [selectedName, setSelectedName] = useState("Search");
  const [copiedKey, setCopiedKey] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filteredIcons = useMemo(() => {
    const search = deferredQuery.trim().toLowerCase();
    if (!search) {
      return iconCatalog;
    }

    return iconCatalog.filter((icon) => icon.searchText.includes(search));
  }, [deferredQuery]);

  const selectedIcon =
    filteredIcons.find((icon) => icon.name === selectedName) ??
    iconCatalog.find((icon) => icon.name === selectedName) ??
    iconCatalog[0];

  const installCommand = frameworkInstallMap[framework];
  const usageSnippet = makeUsageSnippet(selectedIcon.name, framework, variant);
  const svgMarkup = makeSvgMarkup(selectedIcon, variant);
  const SelectedIcon =
    ((Icons as Record<string, IconComponent>)[selectedIcon.name] ??
      Icons.Search) as IconComponent;

  useEffect(() => {
    const title = `${selectedIcon.name} Icon | Rayna UI Icons`;
    const description = `Browse the ${selectedIcon.name} icon in Rayna UI Icons and copy install and usage snippets for React, React Native, and Vue.`;

    document.title = title;

    const descriptionTag = document.querySelector(
      'meta[name="description"]'
    );
    if (descriptionTag) {
      descriptionTag.setAttribute("content", description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector(
      'meta[name="twitter:description"]'
    );

    ogTitle?.setAttribute("content", title);
    ogDescription?.setAttribute("content", description);
    twitterTitle?.setAttribute("content", title);
    twitterDescription?.setAttribute("content", description);
  }, [selectedIcon.name]);

  useEffect(() => {
    if (!copiedKey) {
      return;
    }

    const timeout = window.setTimeout(() => setCopiedKey(""), 1600);
    return () => window.clearTimeout(timeout);
  }, [copiedKey]);

  async function copyText(key: string, value: string) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      }
      setCopiedKey(key);
    } catch {
      setCopiedKey("");
    }
  }

  return (
    <div className="page-shell">
      <div className="page-noise" />
      <header className="hero-section">
        <nav className="topbar">
          <div className="brand-mark">
            <span className="brand-dot" />
            <span>Rayna UI Icons</span>
          </div>
          <div className="topbar-links">
            <a href="#install">Install</a>
            <a href="#catalog">Catalog</a>
            <a href="#usage">Usage</a>
          </div>
        </nav>

        <div className="hero-grid">
          <section className="hero-copy">
            <span className="eyebrow">Rayna UI / icon system</span>
            <h1>Warm, expressive interface icons for React, React Native, and Vue.</h1>
            <p>
              A single TypeScript icon package, bold and linear variants, and a
                brand-led homepage built around the same catalog metadata that ships
                through GitHub Packages.
            </p>

            <div className="hero-actions">
              <a className="button-primary" href="#catalog">
                Browse icons
              </a>
              <a className="button-secondary" href="#install">
                Installation guide
              </a>
            </div>

            <div className="hero-stats">
              {featureStats.map((item) => (
                <div className="stat-tile" key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="hero-panel">
            <div className="hero-panel-header">
              <span>Rayna theme preview</span>
              <span>{frameworkTitleMap[framework]}</span>
            </div>

            <div className="spotlight-grid">
              {spotlightNames.map((name) => {
                const SpotlightIcon = (Icons as Record<
                  string,
                  IconComponent
                >)[name];

                return (
                  <button
                    className="spotlight-card"
                    type="button"
                    key={name}
                    onClick={() => setSelectedName(name)}
                  >
                    <SpotlightIcon size={28} color="#17120f" variant={variant} />
                    <span>{name}</span>
                  </button>
                );
              })}
            </div>

            <div className="code-strip">
              <span>Install</span>
              <code>{installCommand}</code>
            </div>
          </section>
        </div>
      </header>

      <main className="content-shell">
        <section className="docs-section" id="install">
          <div className="section-heading">
            <span className="eyebrow">Install</span>
            <h2>One package, three subpath entry points.</h2>
          </div>

          <div className="framework-switcher" role="tablist" aria-label="Framework switcher">
            {(["react", "react-native", "vue"] as Framework[]).map((item) => (
              <button
                type="button"
                role="tab"
                key={item}
                className={item === framework ? "chip active" : "chip"}
                aria-selected={item === framework}
                onClick={() => setFramework(item)}
              >
                {frameworkTitleMap[item]}
              </button>
            ))}
          </div>

          <div className="install-grid">
            <article className="install-card">
              <span className="card-label">Package</span>
              <h3>{`@emekauja/raynaui-icons/${framework}`}</h3>
              <code>{installCommand}</code>
            </article>
            <FeatureCard
              title="Shared API"
              body="Every adapter exposes the same size, color, mirrored, and variant props so snippets translate across frameworks."
            />
            <FeatureCard
              title="Generated catalog"
              body="The homepage, package exports, and search aliases all come from the same generated icon metadata in core."
            />
          </div>
        </section>

        <section className="catalog-layout" id="catalog">
          <div className="catalog-panel">
            <div className="section-heading">
              <span className="eyebrow">Catalog</span>
              <h2>Search by export name, raw filename, or alias.</h2>
            </div>

            <div className="catalog-toolbar">
              <label className="search-field">
                <Icons.Search size={18} color="#8a776b" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Try search, wallet, AI-stars, or graduating cap"
                  aria-label="Search icons"
                />
              </label>

              <div className="framework-switcher">
                {(["linear", "bold"] as IconVariant[]).map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={item === variant ? "chip active" : "chip"}
                    onClick={() => setVariant(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <p className="catalog-summary">
              Showing {filteredIcons.length} of {iconCatalog.length} icons.
            </p>

            <div className="icon-grid">
              {filteredIcons.map((icon) => {
                const IconComponent = (Icons as Record<
                  string,
                  IconComponent
                >)[icon.name];

                return (
                  <button
                    type="button"
                    key={icon.name}
                    className={icon.name === selectedIcon.name ? "icon-card active" : "icon-card"}
                    aria-label={`Open ${icon.name}`}
                    onClick={() => setSelectedName(icon.name)}
                  >
                    <IconComponent size={26} color="#17120f" variant={variant} />
                    <strong>{icon.name}</strong>
                    <span>{icon.kebabName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="detail-panel" id="usage">
            <div className="detail-preview">
              <div className="detail-preview-inner">
                <SelectedIcon size={72} color="#ff6b35" variant={variant} />
              </div>
              <div>
                <span className="card-label">Selected icon</span>
                <h3>{selectedIcon.name}</h3>
                <p>{selectedIcon.aliases.join(" · ")}</p>
              </div>
            </div>

            <div className="snippet-card">
              <div className="snippet-header">
                <span>Import + usage</span>
                <button
                  type="button"
                  className="copy-button"
                  onClick={() => copyText("snippet", usageSnippet)}
                >
                  {copiedKey === "snippet" ? "Copied" : "Copy"}
                </button>
              </div>
              <pre>{usageSnippet}</pre>
            </div>

            <div className="snippet-card">
              <div className="snippet-header">
                <span>Raw SVG</span>
                <button
                  type="button"
                  className="copy-button"
                  onClick={() => copyText("svg", svgMarkup)}
                >
                  {copiedKey === "svg" ? "Copied" : "Copy"}
                </button>
              </div>
              <pre>{svgMarkup}</pre>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
