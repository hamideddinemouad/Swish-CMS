import type { FAQData } from "@/visualizer/demo/FAQ/data";

export type FaqListProps = FAQData["faq"];

export default function FaqList({ title, description, categories }: FaqListProps) {
  return (
    <section className="space-y-6 py-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">FAQ</p>
        <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <div className="space-y-6">
        {categories.map((category) => (
          <article key={category.name} className="space-y-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-md">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">{category.name}</p>
            <div className="space-y-4">
              {category.entries.map((entry) => (
                <div key={entry.question} className="space-y-1">
                  <p className="text-sm font-semibold text-slate-700">{entry.question}</p>
                  <p className="text-sm text-slate-500">{entry.answer}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
