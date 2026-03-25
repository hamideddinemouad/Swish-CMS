import type { FooterProps } from "@/visualizer/components/home/footer";
import type { HeaderProps } from "@/visualizer/components/home/header";
import type { HeroProps } from "@/visualizer/components/home/hero";
import type { NavProps } from "@/visualizer/components/home/nav";

// Re-exporting types through a single import path keeps the demo payload aligned
// with the actual component prop contracts.
export type VisualizerDemo = {
  nav: NavProps;
  header: HeaderProps;
  hero: HeroProps;
  footer: FooterProps;
};

export const visualizerDemo: VisualizerDemo = {
  nav: {
    brand: "Swish Visualizer",
    tagline: "Demo route for JSONB-driven home blocks",
    links: [
      { label: "Overview", href: "#overview" },
      { label: "Header", href: "#header" },
      { label: "Hero", href: "#hero" },
      { label: "Footer", href: "#footer" },
    ],
    actionLabel: "Inspect props",
    actionHref: "#hero",
    accentColor: "var(--color-wix-blue)",
    textColor: "var(--color-ink-900)",
    mutedTextColor: "var(--color-ink-700)",
  },
  header: {
    eyebrow: "Visualizer route",
    title: "A demo route that shows how the same blocks react to different props.",
    description:
      "This page is a practical preview surface for the visualizer engine. In production, the data could come from JSONB after a preprocessing step maps tenant-specific values into these components.",
    primaryActionLabel: "View hero",
    primaryActionHref: "#hero",
    secondaryActionLabel: "Open footer",
    secondaryActionHref: "#footer",
    stats: [
      { label: "Components", value: "04" },
      { label: "Overrides", value: "Color + copy" },
      { label: "Source", value: "JSONB" },
    ],
    points: [
      {
        title: "Default-safe",
        description: "Missing props still render useful content.",
      },
      {
        title: "Tenant aware",
        description: "Each tenant can receive a distinct copy and palette.",
      },
      {
        title: "Preanalysis ready",
        description: "A preprocessing phase can derive the exact prop object.",
      },
    ],
    accentColor: "#3b82f6",
    surfaceColor: "rgba(255, 255, 255, 0.86)",
    textColor: "var(--color-ink-900)",
    mutedTextColor: "var(--color-ink-700)",
  },
  hero: {
    badge: "Demo render",
    title: "Blocks can be filled with HTML content and ready-to-use props.",
    description:
      "Use this route to test changing text, links, and colors without touching the component implementation. That is the basic visualizer loop: data in, props analyzed, block output rendered.",
    primaryActionLabel: "Primary CTA",
    primaryActionHref: "#footer",
    secondaryActionLabel: "Secondary CTA",
    secondaryActionHref: "#header",
    metrics: [
      { label: "Theme variables", value: "6" },
      { label: "Fallbacks", value: "Built in" },
      { label: "Render mode", value: "Static HTML" },
    ],
    features: [
      {
        title: "Text override",
        description: "Swap titles and descriptions from the database payload.",
      },
      {
        title: "Color override",
        description: "Feed brand colors directly into the component props.",
      },
      {
        title: "Link override",
        description: "Change CTAs per tenant or campaign without code changes.",
      },
    ],
    panelTitle: "Sample payload",
    panelSubtitle: "The structure below is what a preanalysis step would target.",
    accentColor: "#0ea5e9",
    surfaceColor: "rgba(255, 255, 255, 0.88)",
    textColor: "var(--color-ink-900)",
    mutedTextColor: "var(--color-ink-700)",
  },
  footer: {
    brand: "Visualizer engine",
    description: "A sample tenant-ready footer built from prop objects.",
    legalNote:
      "This route is intentionally simple so you can inspect the component API and map it to your JSONB schema.",
    copyright: "Copyright 2026 Swish CMS",
    accentColor: "var(--color-wix-blue)",
    textColor: "var(--color-ink-900)",
    mutedTextColor: "var(--color-ink-700)",
  },
};
