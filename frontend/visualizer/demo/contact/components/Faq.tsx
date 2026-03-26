import type { ContactData } from "../data";

export type FaqProps = ContactData["faq"];

export default function Faq({ title, entries }: FaqProps) {
  return (
    <section className="space-y-6 py-8">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">FAQ</p>
        <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
      </div>
      <div className="space-y-4">
        {entries.map((entry) => (
          <article
            key={entry.question}
            className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              {entry.question}
            </p>
            <p className="mt-2 text-sm text-slate-600">{entry.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
