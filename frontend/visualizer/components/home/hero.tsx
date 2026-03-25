import type { CSSProperties } from "react";

type HeroMetric = {
  label: string;
  value: string;
};

type HeroFeature = {
  title: string;
  description: string;
};

export type HeroProps = {
  badge?: string;
  title?: string;
  description?: string;
  primaryActionLabel?: string;
  primaryActionHref?: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  metrics?: HeroMetric[];
  features?: HeroFeature[];
  panelTitle?: string;
  panelSubtitle?: string;
  backgroundColor?: string;
  surfaceColor?: string;
  accentColor?: string;
  textColor?: string;
  mutedTextColor?: string;
};

const defaultMetrics: HeroMetric[] = [
  { label: "Response time", value: "< 50ms" },
  { label: "Overrides", value: "Per tenant" },
  { label: "Fallbacks", value: "Always on" },
];

const defaultFeatures: HeroFeature[] = [
  {
    title: "Editable colors",
    description: "Swap accent, surface, and text colors without changing the component tree.",
  },
  {
    title: "Content-ready defaults",
    description: "Use the same block even when a field is missing in JSONB.",
  },
  {
    title: "Simple payloads",
    description: "Keep the shape easy for a preanalysis step to map and validate.",
  },
];

export default function Hero({
  badge = "Tenant preview",
  title = "A home page that renders from component props, not hardcoded content.",
  description = "The visualizer engine can take structured JSONB, analyze it, and feed each block the props it needs. This version is intentionally direct: the HTML is ready, and the colors or copy can be overridden from data.",
  primaryActionLabel = "Start preview",
  primaryActionHref = "#preview",
  secondaryActionLabel = "Read docs",
  secondaryActionHref = "#docs",
  metrics = defaultMetrics,
  features = defaultFeatures,
  panelTitle = "Rendered output",
  panelSubtitle = "Example of the same block responding to tenant data.",
  backgroundColor = "transparent",
  surfaceColor = "rgba(255, 255, 255, 0.82)",
  accentColor = "var(--color-wix-blue)",
  textColor = "var(--color-ink-900)",
  mutedTextColor = "var(--color-ink-700)",
}: HeroProps) {
  const style = {
    backgroundColor,
    color: textColor,
  } satisfies CSSProperties;

  return (
    <section className="py-8 lg:py-12" style={style}>
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div className="space-y-6">
          <span
            className="inline-flex w-fit rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{
              borderColor: "rgba(56, 153, 236, 0.18)",
              color: accentColor,
              backgroundColor: "rgba(56, 153, 236, 0.08)",
            }}
          >
            {badge}
          </span>

          <div className="space-y-4">
            <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              {title}
            </h2>
            <p className="max-w-2xl text-lg leading-8" style={{ color: mutedTextColor }}>
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={primaryActionHref}
              className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgb(56_153_236_/_0.18)]"
              style={{ backgroundColor: accentColor }}
            >
              {primaryActionLabel}
            </a>
            <a
              href={secondaryActionHref}
              className="inline-flex items-center justify-center rounded-2xl border px-5 py-3 text-sm font-semibold"
              style={{
                borderColor: "rgba(146, 146, 146, 0.18)",
                backgroundColor: surfaceColor,
                color: textColor,
              }}
            >
              {secondaryActionLabel}
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[24px] border p-4"
                style={{
                  borderColor: "rgba(146, 146, 146, 0.14)",
                  backgroundColor: surfaceColor,
                }}
              >
                <p className="text-2xl font-semibold tracking-[-0.04em]">{metric.value}</p>
                <p className="mt-1 text-sm" style={{ color: mutedTextColor }}>
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-[36px] border p-6 shadow-[0_18px_50px_rgb(54_54_54_/_0.06)] lg:p-8"
          style={{
            borderColor: "rgba(146, 146, 146, 0.18)",
            backgroundColor: surfaceColor,
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: accentColor }}>
                {panelTitle}
              </p>
              <p className="mt-1 text-sm" style={{ color: mutedTextColor }}>
                {panelSubtitle}
              </p>
            </div>
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-sm font-bold text-white"
              style={{ backgroundColor: accentColor }}
            >
              JSON
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-[24px] border px-5 py-5"
                style={{ borderColor: "rgba(146, 146, 146, 0.14)" }}
              >
                <p className="text-lg font-semibold tracking-[-0.03em]">{feature.title}</p>
                <p className="mt-2 text-sm leading-6" style={{ color: mutedTextColor }}>
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
