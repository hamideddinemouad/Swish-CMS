import type { CSSProperties } from "react";

type FooterLink = {
  label: string;
  href: string;
};

type FooterGroup = {
  title: string;
  links: FooterLink[];
};

export type FooterProps = {
  brand?: string;
  description?: string;
  groups?: FooterGroup[];
  legalNote?: string;
  copyright?: string;
  backgroundColor?: string;
  borderColor?: string;
  accentColor?: string;
  textColor?: string;
  mutedTextColor?: string;
};

const defaultGroups: FooterGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Workflow", href: "#workflow" },
      { label: "Templates", href: "#templates" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "#docs" },
      { label: "Schema", href: "#schema" },
      { label: "Changelog", href: "#changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
      { label: "Support", href: "#support" },
    ],
  },
];

export default function Footer({
  brand = "Swish Visualizer",
  description = "A component-first rendering surface for tenant-specific content.",
  groups = defaultGroups,
  legalNote = "Designed for JSONB-driven pages with safe defaults.",
  copyright = "Copyright 2026 Swish CMS",
  backgroundColor = "rgba(255, 255, 255, 0.72)",
  borderColor = "rgba(146, 146, 146, 0.18)",
  accentColor = "var(--color-wix-blue)",
  textColor = "var(--color-ink-900)",
  mutedTextColor = "var(--color-ink-700)",
}: FooterProps) {
  const style = {
    backgroundColor,
    borderColor,
    color: textColor,
  } satisfies CSSProperties;

  return (
    <footer className="mt-10 border-t py-10 lg:mt-16" style={style}>
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold text-white"
                style={{ backgroundColor: accentColor }}
              >
                V
              </span>
              <div>
                <p className="text-lg font-semibold tracking-[-0.03em]">{brand}</p>
                <p className="text-sm" style={{ color: mutedTextColor }}>
                  {description}
                </p>
              </div>
            </div>

            <p className="max-w-xl text-sm leading-6" style={{ color: mutedTextColor }}>
              {legalNote}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: accentColor }}>
                  {group.title}
                </p>
                <ul className="mt-4 space-y-3 text-sm">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="hover:opacity-80" style={{ color: mutedTextColor }}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between" style={{ borderColor }}>
          <p style={{ color: mutedTextColor }}>{copyright}</p>
          <p style={{ color: mutedTextColor }}>Ready for tenant-specific overrides.</p>
        </div>
      </div>
    </footer>
  );
}
