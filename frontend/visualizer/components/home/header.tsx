import type { CSSProperties } from "react";

type HeaderStat = {
  label: string;
  value: string;
};

type HeaderPoint = {
  title: string;
  description: string;
};

export type HeaderProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryActionLabel?: string;
  primaryActionHref?: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  stats?: HeaderStat[];
  points?: HeaderPoint[];
  backgroundColor?: string;
  surfaceColor?: string;
  accentColor?: string;
  textColor?: string;
  mutedTextColor?: string;
};

const defaultPoints: HeaderPoint[] = [
  {
    title: "JSONB-driven content",
    description: "Each block can read its own props and fall back to safe defaults.",
  },
  {
    title: "Tenant specific output",
    description: "The same component tree can render different content per tenant.",
  },
  {
    title: "Ready for analysis",
    description: "Preprocessing can map database fields into component props.",
  },
];

const defaultStats: HeaderStat[] = [
  { label: "Blocks", value: "04" },
  { label: "Themes", value: "12" },
  { label: "Overrides", value: "Unlimited" },
];

export default function Header({
  eyebrow = "Visual Builder",
  title = "Build tenant-specific home pages from structured data.",
  description = "This section is a practical experiment: every block is real HTML, but the content, palette, and CTA labels can all be swapped from JSONB before render.",
  primaryActionLabel = "Open preview",
  primaryActionHref = "#preview",
  secondaryActionLabel = "View schema",
  secondaryActionHref = "#schema",
  stats = defaultStats,
  points = defaultPoints,
  backgroundColor = "transparent",
  surfaceColor = "rgba(255, 255, 255, 0.82)",
  accentColor = "var(--color-wix-blue)",
  textColor = "var(--color-ink-900)",
  mutedTextColor = "var(--color-ink-700)",
}: HeaderProps) {
  const wrapperStyle = {
    backgroundColor,
    color: textColor,
  } satisfies CSSProperties;

  return (
    <header className="py-10 lg:py-16" style={wrapperStyle}>
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div className="flex flex-col justify-center gap-6">
          <p
            className="inline-flex w-fit rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{
              borderColor: "rgba(56, 153, 236, 0.18)",
              color: accentColor,
              backgroundColor: "rgba(56, 153, 236, 0.08)",
            }}
          >
            {eyebrow}
          </p>

          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
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
                color: textColor,
                backgroundColor: surfaceColor,
              }}
            >
              {secondaryActionLabel}
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[24px] border px-4 py-4 shadow-[0_14px_36px_rgb(54_54_54_/_0.05)]"
                style={{
                  borderColor: "rgba(146, 146, 146, 0.14)",
                  backgroundColor: surfaceColor,
                }}
              >
                <p className="text-2xl font-semibold tracking-[-0.04em]">{stat.value}</p>
                <p className="mt-1 text-sm" style={{ color: mutedTextColor }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div
            className="w-full max-w-md rounded-[32px] border p-6 shadow-[0_18px_50px_rgb(54_54_54_/_0.06)] lg:p-8"
            style={{
              borderColor: "rgba(146, 146, 146, 0.18)",
              backgroundColor: surfaceColor,
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: accentColor }}>
                  Content block
                </p>
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: "rgba(56, 153, 236, 0.08)",
                    color: accentColor,
                  }}
                >
                  Active
                </span>
              </div>

              <div className="rounded-[24px] border p-5" style={{ borderColor: "rgba(146, 146, 146, 0.14)" }}>
                <p className="text-sm font-medium uppercase tracking-[0.14em]" style={{ color: mutedTextColor }}>
                  Home hero
                </p>
                <p className="mt-3 text-xl font-semibold tracking-[-0.04em]">
                  Default props keep the page useful, even when the database payload is partial.
                </p>
              </div>

              <div className="space-y-3">
                {points.map((point) => (
                  <div key={point.title} className="rounded-[20px] border px-4 py-4" style={{ borderColor: "rgba(146, 146, 146, 0.14)" }}>
                    <p className="font-semibold">{point.title}</p>
                    <p className="mt-1 text-sm leading-6" style={{ color: mutedTextColor }}>
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
