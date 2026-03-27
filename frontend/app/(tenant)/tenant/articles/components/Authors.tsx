import type { ArticlesData } from "@/visualizer/demo/articles/data";

export type AuthorsProps = ArticlesData["authors"];

export default function Authors({ title, people }: AuthorsProps) {
  return (
    <section className="space-y-6 py-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-300">Bylines</p>
        <h2 className="text-3xl font-semibold text-white">{title}</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {people.map((person) => (
          <article key={person.name} className="space-y-3 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
            <div className="flex items-center gap-4">
              <img src={person.avatar} alt={person.name} className="h-16 w-16 rounded-full object-cover" />
              <div>
                <p className="text-lg font-semibold text-white">{person.name}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">{person.role}</p>
                <p className="text-xs text-slate-500">{person.focus}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
