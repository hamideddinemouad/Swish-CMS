import { preferences as defaultPreferences } from "@/visualizer/demo/about/preference";
import type { AboutData } from "@/visualizer/demo/about/data";
import type { AboutPreferences } from "@/visualizer/demo/about/preference";

export type TeamProps = AboutData["team"] & {
  preferences?: AboutPreferences;
};

export default function Team({ title, members, preferences }: TeamProps) {
  const tokens = preferences ?? defaultPreferences;
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">People</p>
        <h2 className="text-3xl font-semibold text-amber-900">{title}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {members.map((member) => (
          <article
            key={member.name}
            className={`${tokens.cards.base} space-y-4 transition hover:-translate-y-1 hover:shadow-2xl`}
          >
            <img
              src={member.avatar}
              alt={member.name}
              className="h-36 w-full rounded-2xl object-cover"
            />
            <div className="space-y-1">
              <p className="text-lg font-semibold text-amber-900">{member.name}</p>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">{member.role}</p>
              <p className="text-sm text-amber-600">{member.bio}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {member.socials.map((social) => (
                <a
                  key={social.slug}
                  href={social.slug}
                  className="text-sm font-semibold text-amber-600 underline-offset-4 transition hover:text-rose-500"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
