import type { ArticlesData } from "@/visualizer/demo/articles/data";
import { preferences as defaultPreferences } from "@/visualizer/demo/articles/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { ArticlesPreferences } from "@/visualizer/demo/articles/preference";

export type NewsletterProps = ArticlesData["newsletter"] & {
  preferences?: ArticlesPreferences;
};

export default function Newsletter({ heading, body, ctaText, ctaLink, preferences }: NewsletterProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "newsletter");
  const design = resolvePageComponentDesign(rawPreferences, "newsletter");
  return (
    <section className={`space-y-4 ${design.color.newsletterShellClass}`}>
      <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${design.color.accentClass}`}>Newsletter</p>
      <h2 className={`${tokens.typography.headingSizes.h2} font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{heading}</h2>
      <p className={`${tokens.typography.smallSize} ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{body}</p>
      <a
        href={ctaLink}
        className={design.color.newsletterButtonClass}
      >
        {ctaText}
      </a>
    </section>
  );
}
