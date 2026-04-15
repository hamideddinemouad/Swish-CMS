import { preferences as defaultPreferences } from "@/visualizer/demo/about/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { AboutData } from "@/visualizer/demo/about/data";
import type { AboutPreferences } from "@/visualizer/demo/about/preference";
import TenantImage from "../../components/TenantImage";

export type TeamProps = AboutData["team"] & {
  preferences?: AboutPreferences;
};

export default function Team({ title, members, preferences }: TeamProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "team");
  const design = resolvePageComponentDesign(rawPreferences, "team");
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${design.color.accentClass}`}>People</p>
        <h2 className={`${tokens.typography.headingSizes.h2} font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {members.map((member) => (
          <article
            key={member.name}
            className={`${tokens.cards.base} space-y-4 transition hover:-translate-y-1 hover:shadow-2xl`}
          >
            <TenantImage
              src={member.avatar}
              alt={member.name}
              className="h-36 w-full rounded-2xl"
            />
            <div className="space-y-1">
              <p className={`text-lg font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{member.name}</p>
              <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${design.color.accentClass}`}>{member.role}</p>
              <p className={`text-sm ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{member.bio}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {member.socials.map((social) => (
                <span
                  key={social.slug}
                  className={`text-sm font-semibold underline-offset-4 transition ${design.color.linkAccentClass}`}
                >
                  {social.label}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
