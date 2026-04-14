import type { ArticlesData } from "@/visualizer/demo/articles/data";
import { preferences as defaultPreferences } from "@/visualizer/demo/articles/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { ArticlesPreferences } from "@/visualizer/demo/articles/preference";

export type AuthorsProps = ArticlesData["authors"] & {
  preferences?: ArticlesPreferences;
};

export default function Authors({ title, people, preferences }: AuthorsProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "authors");
  const design = resolvePageComponentDesign(rawPreferences, "authors");
  return (
    <section className="space-y-6 py-6">
      <div className="space-y-1">
        <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${design.color.accentClass}`}>Bylines</p>
        <h2 className={`${tokens.typography.headingSizes.h2} font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {people.map((person) => (
          <article key={person.name} className={`space-y-3 ${tokens.cards.compact}`}>
            <div className="flex items-center gap-4">
              <img src={person.avatar} alt={person.name} className="h-16 w-16 rounded-full object-cover" />
              <div>
                <p className={`text-lg font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{person.name}</p>
                <p className={`text-xs uppercase tracking-[0.3em] ${design.color.accentClass}`}>{person.role}</p>
                <p className={`text-xs ${design.color.mutedClass}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{person.focus}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
