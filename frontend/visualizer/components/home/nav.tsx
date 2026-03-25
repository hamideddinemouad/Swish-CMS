import type { CSSProperties } from "react";

type NavLink = {
  label: string;
  href: string;
};

export type NavProps = {
  brand?: string;
  tagline?: string;
  links?: NavLink[];
  actionLabel?: string;
  actionHref?: string;
  backgroundColor?: string;
  borderColor?: string;
  accentColor?: string;
  textColor?: string;
  mutedTextColor?: string;
};

const defaultLinks: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
];

export default function Nav({
  brand = "Swish Visualizer",
  tagline = "Tenant-aware content blocks driven by JSONB",
  links = defaultLinks,
  actionLabel = "Preview",
  actionHref = "#preview",
  backgroundColor = "rgba(255, 255, 255, 0.82)",
  borderColor = "rgba(146, 146, 146, 0.18)",
  accentColor = "var(--color-wix-blue)",
  textColor = "var(--color-ink-900)",
  mutedTextColor = "var(--color-ink-700)",
}: NavProps) {
  const style = {
    backgroundColor,
    borderColor,
    color: textColor,
  } satisfies CSSProperties;

  return (
    <nav
      className="sticky top-0 z-20 border-b backdrop-blur-xl"
      style={style}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-4">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-[0_18px_40px_rgb(56_153_236_/_0.28)]"
            style={{ backgroundColor: accentColor }}
          >
            V
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.12em] uppercase">
              {brand}
            </p>
            <p className="text-sm" style={{ color: mutedTextColor }}>
              {tagline}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 hover:bg-black/5"
                style={{ color: mutedTextColor }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href={actionHref}
            className="inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold text-white shadow-[0_16px_30px_rgb(56_153_236_/_0.18)]"
            style={{ backgroundColor: accentColor }}
          >
            {actionLabel}
          </a>
        </div>
      </div>
    </nav>
  );
}
