import type { ArticlesData } from "../data";

export type NewsletterProps = ArticlesData["newsletter"];

export default function Newsletter({ heading, body, ctaText, ctaLink }: NewsletterProps) {
  return (
    <section className="space-y-4 rounded-3xl border border-emerald-500 bg-gradient-to-r from-slate-900 to-slate-950 px-6 py-8 shadow-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">Newsletter</p>
      <h2 className="text-3xl font-semibold text-white">{heading}</h2>
      <p className="text-sm text-slate-300">{body}</p>
      <a
        href={ctaLink}
        className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-emerald-400"
      >
        {ctaText}
      </a>
    </section>
  );
}
