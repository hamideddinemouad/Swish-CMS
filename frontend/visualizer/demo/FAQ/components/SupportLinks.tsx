import type { FAQData } from "../data";

export type SupportLinksProps = FAQData["supportLinks"];

export default function SupportLinks({ title, items }: SupportLinksProps) {
  return (
    <section className="space-y-6 py-8">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Support</p>
        <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <a
            key={item.slug}
            href={item.slug}
            className="rounded-2xl border border-slate-200 bg-white/90 p-6 text-sm font-semibold text-slate-700 transition hover:border-emerald-400"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
            <p className="text-sm text-slate-500">{item.detail}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
