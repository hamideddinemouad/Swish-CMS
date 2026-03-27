import type { HomeData } from "@/visualizer/demo/home/data";

export type NewsletterProps = HomeData["newsletter"];

export default function Newsletter({ heading, body, ctaText, ctaLink }: NewsletterProps) {
  return (
    <section className="space-y-4 rounded-3xl border border-amber-500 bg-gradient-to-r from-amber-500/20 to-slate-900/60 px-6 py-8 text-white shadow-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Newsletter</p>
      <h2 className="text-3xl font-semibold">{heading}</h2>
      <p className="text-sm text-amber-100">{body}</p>
      <a
        href={ctaLink}
        className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg hover:bg-slate-100"
      >
        {ctaText}
      </a>
    </section>
  );
}
