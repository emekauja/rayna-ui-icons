export const raynaTheme = {
  name: "rayna-ui",
  colors: {
    canvas: "#f8ecdf",
    surface: "#fff7ef",
    surfaceStrong: "#fff1e4",
    surfaceInverse: "#17120f",
    ink: "#1b1512",
    inkSoft: "#5f4d43",
    inkMuted: "#8a776b",
    line: "rgba(34, 22, 14, 0.12)",
    primary: "#ff6b35",
    primaryStrong: "#e55420",
    primarySoft: "#ffd6c8",
    secondary: "#ffb54d",
    secondarySoft: "#ffe8bd",
    accent: "#f14f70",
    accentSoft: "#ffd9e1",
    success: "#198f67",
    highlight: "#fff7cc",
    shadow: "rgba(26, 19, 14, 0.18)",
  },
  gradients: {
    hero:
      "linear-gradient(135deg, rgba(255, 181, 77, 0.96) 0%, rgba(255, 107, 53, 0.92) 46%, rgba(241, 79, 112, 0.88) 100%)",
    mesh:
      "radial-gradient(circle at top left, rgba(255, 215, 188, 0.9), transparent 42%), radial-gradient(circle at bottom right, rgba(255, 221, 148, 0.85), transparent 38%), linear-gradient(180deg, #fff9f2 0%, #f8ecdf 100%)",
    card:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 244, 232, 0.92) 100%)",
  },
  shadows: {
    soft: "0 18px 50px rgba(26, 19, 14, 0.09)",
    medium: "0 26px 80px rgba(26, 19, 14, 0.12)",
    glow: "0 14px 40px rgba(255, 107, 53, 0.22)",
  },
  radius: {
    sm: "14px",
    md: "22px",
    lg: "30px",
    pill: "999px",
  },
  spacing: {
    xs: "0.4rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3.5rem",
  },
  typography: {
    display:
      "\"Sora\", \"Space Grotesk\", \"Avenir Next\", \"Segoe UI\", sans-serif",
    body:
      "\"Manrope\", \"Inter\", \"Avenir Next\", \"Segoe UI\", sans-serif",
    mono:
      "\"JetBrains Mono\", \"SFMono-Regular\", \"SF Mono\", Consolas, monospace",
  },
} as const;

export const themeVariablesCss = `
:root {
  --rayna-canvas: ${raynaTheme.colors.canvas};
  --rayna-surface: ${raynaTheme.colors.surface};
  --rayna-surface-strong: ${raynaTheme.colors.surfaceStrong};
  --rayna-surface-inverse: ${raynaTheme.colors.surfaceInverse};
  --rayna-ink: ${raynaTheme.colors.ink};
  --rayna-ink-soft: ${raynaTheme.colors.inkSoft};
  --rayna-ink-muted: ${raynaTheme.colors.inkMuted};
  --rayna-line: ${raynaTheme.colors.line};
  --rayna-primary: ${raynaTheme.colors.primary};
  --rayna-primary-strong: ${raynaTheme.colors.primaryStrong};
  --rayna-primary-soft: ${raynaTheme.colors.primarySoft};
  --rayna-secondary: ${raynaTheme.colors.secondary};
  --rayna-secondary-soft: ${raynaTheme.colors.secondarySoft};
  --rayna-accent: ${raynaTheme.colors.accent};
  --rayna-accent-soft: ${raynaTheme.colors.accentSoft};
  --rayna-success: ${raynaTheme.colors.success};
  --rayna-highlight: ${raynaTheme.colors.highlight};
  --rayna-shadow: ${raynaTheme.colors.shadow};
  --rayna-gradient-hero: ${raynaTheme.gradients.hero};
  --rayna-gradient-mesh: ${raynaTheme.gradients.mesh};
  --rayna-gradient-card: ${raynaTheme.gradients.card};
  --rayna-shadow-soft: ${raynaTheme.shadows.soft};
  --rayna-shadow-medium: ${raynaTheme.shadows.medium};
  --rayna-shadow-glow: ${raynaTheme.shadows.glow};
  --rayna-radius-sm: ${raynaTheme.radius.sm};
  --rayna-radius-md: ${raynaTheme.radius.md};
  --rayna-radius-lg: ${raynaTheme.radius.lg};
  --rayna-radius-pill: ${raynaTheme.radius.pill};
  --rayna-font-display: ${raynaTheme.typography.display};
  --rayna-font-body: ${raynaTheme.typography.body};
  --rayna-font-mono: ${raynaTheme.typography.mono};
}
`.trim();
