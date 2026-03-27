import type { CategoriesData } from "@/visualizer/demo/categories/data";

export type NewsletterProps = CategoriesData["newsletter"];

export default function Newsletter({ heading, body, ctaText, ctaLink }: NewsletterProps) {
  return (
    <section className="space-y-4 rounded-3xl border border-orange-200 bg-gradient-to-r from-orange-100 to-white px-6 py-8 shadow-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-500">Newsletter</p>
      <h2 className="text-3xl font-semibold text-slate-900">{heading}</h2>
      <p className="text-sm text-slate-600">{body}</p>
      <a
        href={ctaLink}
        className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-600"
      >
        {ctaText}
      </a>
    </section>
  );
}
